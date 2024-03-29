import { Injectable } from '@nestjs/common';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import {
  BASE_IMAGES_URL,
  BASE_MANGA_PAGE_URL,
  BASE_SEARCH_CHAPTERS_URL,
  BASE_SEARCH_MANGA_URL,
  BASE_SEARCH_PAGES_URL,
  DASH_PATTERN,
  SPACE_PATTERN,
} from './constants';
import { EChapterImageAttribute, EChapterImagesSelector } from './enums';
import { IChapterInformation, ISearchResponse } from './models';
import {
  IMangaScrapingService,
  IOutboundChapter,
  IOutboundGetParams,
  IOutboundImage,
  IOutboundSearchParams,
  IOutboundSearchResponse,
} from '../../interfaces';

@Injectable()
export class InMangaService implements IMangaScrapingService {
  constructor(
    private readonly httpService: HttpService,
    private readonly htmlParser: HtmlParserService,
  ) {}

  public async search({
    value,
  }: IOutboundSearchParams): Promise<IOutboundSearchResponse[]> {
    const query = { name: value };
    const params = { query, url: BASE_SEARCH_MANGA_URL, isJson: true };
    const inMangaAPIResponse = await this.httpService.get(params);
    const data: ISearchResponse = JSON.parse(inMangaAPIResponse.data);
    if (data.success && data.result.length) {
      return data.result.map((searchResult) => {
        const mangaName = String(searchResult.Name).replace(
          SPACE_PATTERN,
          DASH_PATTERN,
        );
        const mangaUrl = `${BASE_MANGA_PAGE_URL}/${mangaName}/${searchResult.Identification}`;

        return {
          name: searchResult.Name,
          url: mangaUrl,
        };
      });
    }

    return [];
  }

  public async get({ url }: IOutboundGetParams): Promise<IOutboundChapter[]> {
    const { length, [length - 1]: altId, [length - 2]: name } = url.split('/');
    const mangaName = String(name).replace(SPACE_PATTERN, DASH_PATTERN);
    const chapters = await this._getChaptersInformation(altId, mangaName);
    const chaptersImagesPromises: Promise<IOutboundChapter>[] = chapters.map(
      async (chapter: IChapterInformation) => {
        return {
          id: chapter.id,
          name: `Chapter ${chapter.id}`,
          images: await this._getChapterImages(
            mangaName,
            chapter.altId,
            chapter.id,
          ),
        };
      },
    );

    return Promise.all(chaptersImagesPromises);
  }

  private async _getChaptersInformation(
    id: string,
    name: string,
  ): Promise<IChapterInformation[]> {
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
    chapterNumber: number,
  ): Promise<IOutboundImage[]> {
    const query = { identification: chapterId };
    const { body } = await this.httpService.get({
      query,
      url: BASE_SEARCH_PAGES_URL,
    });
    const document = await this.htmlParser.parseHtml(body);
    const pageList = document.querySelectorAll(EChapterImagesSelector.PageList);

    return [
      ...pageList[0].querySelectorAll(EChapterImagesSelector.Options),
    ].map((element: Element) => {
      const altId = element.getAttribute(EChapterImageAttribute.Value);
      const page = parseInt(element.textContent, 10);
      const baseUrl = `${BASE_IMAGES_URL}/manga/${mangaName}/chapter/${chapterNumber}/page/${page}/${altId}`;
      return {
        correlative: page,
        url: baseUrl,
      };
    });
  }
}
