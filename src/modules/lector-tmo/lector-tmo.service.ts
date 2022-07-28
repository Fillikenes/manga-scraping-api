import { Injectable } from '@nestjs/common';
import { Browser, Page } from 'puppeteer';
import { PuppeteerService } from '../../services/puppeteer/puppeteer.service';
import { IChapterContainer } from './models';

@Injectable()
export class LectorTmoService {
  constructor(private readonly puppeteerService: PuppeteerService) {}
  async getImagesChapter(url): Promise<any> {
    const browser = await this.puppeteerService.createBrowser();
    const mangaPage = await this.puppeteerService.goToPage({
      browser,
      url,
      setRandomUA: true,
    });

    const chapters = await this._getChaptersInformation(mangaPage);
    await this.puppeteerService.clearCookies(mangaPage);

    for (const chapter of chapters) {
      const validUrl = await this._getValidUrl(browser, chapter.url);
      chapter.images = await this._getImagesInformation(browser, validUrl);
    }

    await this.puppeteerService.closeBrowser(browser);
    return chapters;
  }

  private async _getValidUrl(browser: Browser, chapterUrl: string) {
    const chapterPage = await this.puppeteerService.goToPage({
      browser,
      url: chapterUrl,
    });

    const validUrl = chapterPage.url().replace('paginated', 'cascade');

    await this.puppeteerService.clearCookies(chapterPage);
    await this.puppeteerService.closePage(chapterPage);
    return validUrl;
  }

  private async _getImagesInformation(browser: Browser, chapterUrl: string) {
    const chapterPage = await this.puppeteerService.goToPage({
      browser,
      url: chapterUrl,
    });

    const images = await chapterPage.$$eval('img.viewer-img', (imgs) => {
      return imgs.map((img) => img.getAttribute('data-src'));
    });

    await this.puppeteerService.clearCookies(chapterPage);
    await this.puppeteerService.closePage(chapterPage);
    return images;
  }

  private async _getChaptersInformation(
    page: Page,
  ): Promise<IChapterContainer[]> {
    return page.$$eval('li.list-group-item.upload-link', (containers) =>
      containers.map((container) => {
        const name = container?.querySelector('h4').innerText.trim();
        const url = container
          ?.querySelector('li > div > div:last-child > a')
          ?.getAttribute('href');
        return { name, url };
      }),
    );
  }
}
