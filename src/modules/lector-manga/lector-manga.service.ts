import { Injectable } from '@nestjs/common';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import { IChapter } from './models/';
import { EChapterSelector, ESearchMangaSelector } from './enums';
import {
  EChapterAttribute,
  EImageSelector,
  EImageAttribute,
} from './enums/index';
import { BASE_SEARCH_URL } from './constants';
import {
  IMangaScrapingService,
  IOutboundChapter,
  IOutboundGetParams,
  IOutboundImage,
  IOutboundSearchParams,
} from '../../interfaces';

@Injectable()
export class LectorMangaService implements IMangaScrapingService {
  constructor(
    private readonly httpService: HttpService,
    private readonly htmlParseService: HtmlParserService,
  ) {}

  async search({ value }: IOutboundSearchParams) {
    const nameMangaClean = value.replace(/\s|-/g, '+');
    const params = {
      s: nameMangaClean,
      post_type: 'wp-manga',
      m_orderby: 'views',
    };
    const { body } = await this.httpService.get({
      url: BASE_SEARCH_URL,
      query: params,
    });
    const document = await this.htmlParseService.parseHtml(body);
    return [...document.querySelectorAll(ESearchMangaSelector.Selector)].map(
      (el: Element) => {
        return {
          name: el.innerHTML,
          url: el.getAttribute(EChapterAttribute.Href),
        };
      },
    );
  }

  async get({ url }: IOutboundGetParams): Promise<IOutboundChapter[]> {
    const chapterList = await this._getChapters(url);
    const promises = chapterList.map(async (el: IChapter) => {
      const images = await this._getImgsChapter(el.urlChapter);
      return {
        id: el.chapter,
        name: el.chapter.toString(),
        images,
      };
    });
    return Promise.all(promises);
  }

  private async _getChapters(url: string): Promise<IChapter[]> {
    const { body } = await this.httpService.get({
      url,
    });
    const document = await this.htmlParseService.parseHtml(body);
    return [...document.querySelectorAll(EChapterSelector.Selector)].map(
      (el: Element) => {
        return {
          urlChapter: el.getAttribute(EChapterAttribute.Href),
          chapter: Number(el.innerHTML),
        };
      },
    );
  }
  private async _getImgsChapter(url: string): Promise<IOutboundImage[]> {
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParseService.parseHtml(body);
    return [...document.querySelectorAll(EImageSelector.Selector)].map(
      (el: Element, aux: number) => {
        return {
          url: el.getAttribute(EImageAttribute.Src),
          correlative: aux,
        };
      },
    );
  }
}
