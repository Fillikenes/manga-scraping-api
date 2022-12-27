import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import {
  EChapterAttribute,
  EChapterIdReplace,
  EChapterImageAttribute,
  EChapterSelector,
  EChapterSeparator,
  EChaptersSelector,
  ESearchMangaAttribute,
  ESearchMangaImageAttribute,
  ESearchMangaPagination,
  ESearchMangaSelector,
  ESearchMangasSelector,
  ESearchPageNumber,
} from './enums';
import { BASE_SEARCH_URL } from './constants';
import { IOutboundChapter, IOutboundSearchResponse } from '../../interfaces';

@Injectable()
export class TmoLectorNetService {
  constructor(
    private readonly httpService: HttpService,
    private readonly htmlParser: HtmlParserService,
  ) {}

  public async search(
    value: string,
    getAll: boolean,
  ): Promise<IOutboundSearchResponse[]> {
    const { results, hasMorePages, totalPages } =
      await this._getMangasFromSearch({
        value,
        pageNbr: ESearchPageNumber.Default,
      });

    if (getAll && hasMorePages) {
      const searchPromises = _.range(
        ESearchPageNumber.InitialIteration,
        totalPages + 1,
      ).map(async (pageNbr: number) => {
        const response = await this._getMangasFromSearch({ value, pageNbr });
        return response.results;
      });
      const responses = await Promise.all(searchPromises);
      results.push(..._.flattenDeep(responses));
    }

    return results.map((result) => {
      return {
        name: result.name,
        url: result.url,
      };
    });
  }

  private async _getMangasFromSearch({ value, pageNbr }) {
    const params = {
      query: { search: value, page: pageNbr },
      url: BASE_SEARCH_URL,
    };
    const { body } = await this.httpService.get(params);
    const document = await this.htmlParser.parseHtml(body);
    const results = [
      ...document.querySelectorAll(ESearchMangasSelector.Pages),
    ].map((element: Element) => {
      const url = element.getAttribute(ESearchMangaAttribute.Href);
      const name = element.getAttribute(ESearchMangaAttribute.Title);
      const thumbnail = element
        .querySelector(ESearchMangaSelector.Image)
        .getAttribute(ESearchMangaImageAttribute.Source);
      return {
        url,
        name,
        thumbnail,
      };
    });
    const { length, [length + ESearchMangaPagination.LastPage]: totalPages } = [
      ...document.querySelectorAll(ESearchMangasSelector.Pagination),
    ].map((item: Element) => Number(item.textContent));
    return {
      hasMorePages: !!totalPages,
      hasPreviousPage: totalPages && 1 < pageNbr,
      hasNextPage: totalPages && pageNbr < totalPages,
      totalPages,
      results,
    };
  }

  public async getPage(url: string): Promise<IOutboundChapter[]> {
    const chapters = await this._getChapters(url);
    const chaptersImagesPromises = chapters.map(async (chapter: any) => {
      return {
        id: chapter.id,
        name: chapter.name,
        images: await this._getChapterImages(chapter.url),
      };
    });

    return Promise.all(chaptersImagesPromises);
  }

  private async _getChapters(url: string): Promise<any[]> {
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParser.parseHtml(body);
    return [...document.querySelectorAll(EChaptersSelector.Items)].map(
      (element: Element) => {
        const [chapterInfo, name] = element.textContent
          .trim()
          .split(EChapterSeparator.Name); // textContent => Capítulo 209.00 : Al cuadrado || Capítulo 201.00
        const id = Number(
          chapterInfo.replace(
            EChapterIdReplace.search,
            EChapterIdReplace.replace,
          ),
        );
        const url = element.getAttribute(EChapterAttribute.Href);
        return {
          id,
          url,
          name: name || chapterInfo,
        };
      },
    );
  }

  private async _getChapterImages(url: string): Promise<any[]> {
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParser.parseHtml(body);
    return [...document.querySelectorAll(EChapterSelector.Images)].map(
      (element: Element, index: number) => {
        const url = element.getAttribute(EChapterImageAttribute.DataSrc);
        return {
          url,
          correlative: index + 1,
        };
      },
    );
  }
}
