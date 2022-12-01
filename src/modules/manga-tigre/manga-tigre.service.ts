import { Injectable } from '@nestjs/common';
import { Browser } from 'puppeteer';
import { PuppeteerService } from '../../services/puppeteer/puppeteer.service';
import {
  BASE_MANGA_PAGE_URL,
  BASE_PAGE_URL,
  BASE_SEARCH_MANGA_URL,
} from './constants';
import { HttpService } from '../../services/http/http.service';
import {
  EChapterAttribute,
  EChapterImageAttribute,
  EChapterImageSelector,
  EChapterSeparator,
  EChaptersSelector,
  EImagesSelector,
} from './enums';

@Injectable()
export class MangaTigreService {
  constructor(
    private readonly puppeteerService: PuppeteerService,
    private readonly httpService: HttpService,
  ) {}

  public async searchManga(manga: string): Promise<any> {
    const browser = await this.puppeteerService.createBrowser();
    const { _token, headers } = await this._getToken(browser, manga);
    const query = { query: manga, _token, headers };
    const params = { query, url: BASE_SEARCH_MANGA_URL, isJson: true };
    const searchResult = await this.httpService.post(params);
    await this.puppeteerService.closeBrowser(browser);

    return searchResult.result;
  }

  public async getManga(value: string): Promise<any> {
    const jsonResponse = await this.searchManga(value);
    const { name, slug } = jsonResponse[0];
    const browser = await this.puppeteerService.createBrowser();
    const chapters = await this._getChaptersInformation(browser, slug);
    const chaptersImagesPromises = chapters.map(async (chapter: any) => {
      return {
        ...chapter,
        images: await this._getImagesInformation(browser, chapter.url),
      };
    });
    const resultChapters = await Promise.allSettled(chaptersImagesPromises);
    await this.puppeteerService.closeBrowser(browser);
    return { name, url: BASE_PAGE_URL, chapters: resultChapters };
  }

  private async _getToken(browser: Browser, manga: string) {
    const mangaPage = await this.puppeteerService.goToPage({
      browser,
      url: BASE_PAGE_URL,
      setRandomUA: false,
    });

    await mangaPage.waitForSelector('input.input-search');
    await mangaPage.focus('input.input-search');
    await mangaPage.keyboard.type(manga);

    let _token: string;
    let headers: any;
    mangaPage.on('response', (response) => {
      if (response.url() === BASE_SEARCH_MANGA_URL) {
        const resp = response.request().postData();
        const headersResp = response.request().headers();
        _token = JSON.parse(resp)['_token'];
        headers = { cookie: headersResp['cookie'] };
      }
    });

    await mangaPage.waitForResponse(BASE_SEARCH_MANGA_URL);
    return { _token, headers };
  }

  private async _getChaptersInformation(
    browser: Browser,
    manga: string,
  ): Promise<any> {
    const mangaPage = await this.puppeteerService.goToPage({
      browser,
      url: `${BASE_MANGA_PAGE_URL}/${manga}`,
      setRandomUA: false,
    });
    await this.puppeteerService.clearCookies(mangaPage);

    const loadMore = await mangaPage.$(EChaptersSelector.LoadMore);
    if (loadMore) {
      await loadMore.click();
    }

    return mangaPage.$$eval(
      EChaptersSelector.Items,
      (chapters, EChapterAttribute, EChapterSeparator) =>
        chapters.map((chapter) => {
          const url = chapter.getAttribute(EChapterAttribute.Url);
          const title = chapter.getAttribute(EChapterAttribute.Name);
          const [id, name] = title.split(EChapterSeparator.Name);
          return { id, name: name || title, url };
        }),
      EChapterAttribute,
      EChapterSeparator,
    );
  }

  private async _getImagesInformation(browser: Browser, url: string) {
    const chapterPage = await this.puppeteerService.goToPage({
      browser,
      url,
      setRandomUA: false,
    });

    await chapterPage.waitForSelector(EChapterImageSelector.List);
    await chapterPage.$$eval(
      EChapterImageSelector.List,
      (buttons, EChapterImageSelector) => {
        [...buttons].forEach((button: HTMLButtonElement, index) => {
          if (index === EChapterImageSelector.Cascade) {
            button.click();
          }
        });
      },
      EChapterImageSelector,
    );

    await chapterPage.waitForSelector(EImagesSelector.Images);
    return chapterPage.$$eval(
      EImagesSelector.Images,
      (images, EChapterImageAttribute) =>
        images.map((image) => {
          const baseUrl = image.getAttribute(EChapterImageAttribute.Url);
          const baseUrlAlt = image.getAttribute(EChapterImageAttribute.UrlAlt);
          const url = `http:${baseUrlAlt || baseUrl}`.replace('.webp', '.jpg');
          return { url };
        }),
      EChapterImageAttribute,
    );
  }
}
