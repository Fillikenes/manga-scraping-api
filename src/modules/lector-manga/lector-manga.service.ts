import { Injectable } from '@nestjs/common';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import { IChapter, IImage, IMangaInfo } from './models/';
import { EChapterSelector, ESearchMangaSelector } from './enums';
import {
  EChapterAttribute,
  EImageSelector,
  EImageAttribute,
} from './enums/index';
import { BASE_SEARCH_URL, BASE_URL } from './constants';
@Injectable()
export class LectorMangaService {
  constructor(
    private readonly httpService: HttpService,
    private readonly htmlParseService: HtmlParserService,
  ) {}

  async getInfoManga(nameManga: string): Promise<IMangaInfo[]> {
    const chapterList = await this._getChapters(nameManga);
    const promises = chapterList.map(async (el: IChapter) => {
      const infoImgs = await this._getImgsChapter(el.urlChapter);
      return { ...el, infoImgs };
    });
    return Promise.all(promises);
  }

  private async _getChapters(nameManga: string): Promise<IChapter[]> {
    const url = `${BASE_URL}/${nameManga}/`;
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
  private async _getImgsChapter(url: string): Promise<IImage[]> {
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParseService.parseHtml(body);
    return [...document.querySelectorAll(EImageSelector.Selector)].map(
      (el: Element, aux: number) => {
        return {
          url: el.getAttribute(EImageAttribute.Src),
          page: aux,
        };
      },
    );
  }

  async searchManga(nameManga: string) {
    const nameMangaClean = nameManga.replace(/\s|-/g, '+');
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
}
