import { Injectable } from '@nestjs/common';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import {
  BASE_IMAGES_URL,
  BASE_MANGA_PAGE_URL,
  BASE_SEARCH_CHAPTERS_URL,
  BASE_SEARCH_MANGA_URL,
  BASE_SEARCH_PAGES_URL,
  SPACE_PATTERN,
} from './constants';
import { EChapterImageAttribute, EMangaSearched } from './enums';
import { EChapterImagesSelector } from './enums/index';

@Injectable()
export class InMangaService {
  constructor(
    private readonly httpService: HttpService,
    private readonly htmlParser: HtmlParserService,
  ) {}

  public async search(value: string) {
    const query = { name: value };
    const params = { query, url: BASE_SEARCH_MANGA_URL, isJson: true };
    const inMangaAPIResponse = await this.httpService.get(params);
    return JSON.parse(inMangaAPIResponse.data);
  }

  public async getPage(value: string) {
    const manga = await this._getMangaInformation(value);
    const chapters = await this._getChaptersInformation(
      manga.altId,
      manga.helperName,
    );
    const chaptersImagesPromises: Promise<any>[] = chapters.map(
      async (chapter: any) => {
        return {
          ...chapter,
          images: await this._getChapterImages(
            manga.helperName,
            chapter.altId,
            chapter.id,
          ),
        };
      },
    );

    const resultChapters = await Promise.all(chaptersImagesPromises);
    manga['chapters'] = [...resultChapters];
    return { manga };
  }

  private async _getMangaInformation(manga: string): Promise<any> {
    const jsonResponse = await this.search(manga);

    const { Name, Identification } = jsonResponse.result[EMangaSearched.First];
    const mangaName = String(Name).replace(SPACE_PATTERN, '-');
    const mangaUrl = `${BASE_MANGA_PAGE_URL}/${mangaName}/${Identification}`;

    return {
      name: Name,
      url: mangaUrl,
      altId: Identification,
      helperName: mangaName,
    };
  }

  private async _getChaptersInformation(
    id: string,
    name: string,
  ): Promise<any> {
    const query = { mangaIdentification: id };
    const params = { query, url: BASE_SEARCH_CHAPTERS_URL, isJson: true };
    const inMangaAPIResponse = await this.httpService.get(params);
    const jsonResponse = JSON.parse(inMangaAPIResponse.data);

    const chapters = [...jsonResponse.result].map((chapter: any) => {
      return {
        pagesCount: chapter.PagesCount,
        id: chapter.Number,
        altId: chapter.Identification,
        url: `${BASE_MANGA_PAGE_URL}/${name}/${chapter.Number}/${chapter.Identification}`,
      };
    });

    return chapters.sort((a, b) => a.id - b.id);
  }

  private async _getChapterImages(
    mangaName: string,
    chapterId: string,
    chapterNumber: string,
  ): Promise<any> {
    const query = { identification: chapterId };
    const { body } = await this.httpService.get({
      query,
      url: BASE_SEARCH_PAGES_URL,
    });
    const document = await this.htmlParser.parseHtml(body);
    return [...document.querySelectorAll(EChapterImagesSelector.Options)].map(
      (element: Element) => {
        const altId = element.getAttribute(EChapterImageAttribute.Value);
        const page = parseInt(element.textContent, 10);
        const baseUrl = `${BASE_IMAGES_URL}/manga/${mangaName}/chapter/${chapterNumber}/page/${page}/${altId}`;
        return { altId, page, url: baseUrl };
      },
    );
  }
}
