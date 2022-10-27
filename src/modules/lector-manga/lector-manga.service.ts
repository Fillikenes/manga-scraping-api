import { Injectable } from '@nestjs/common';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import { IChapter, IImage, IMangaInfo } from './models/';
import { EChapterSelector } from './enuns';
import {
  EChapterAttribute,
  EImageSelector,
  EImageAttribute,
} from './enuns/index';
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
    const url = `https://lectormanga.online/manga/${nameManga}/`;
    const { body } = await this.httpService.get({
      url,
    });
    const document = await this.htmlParseService.parseHtml(body);
    return [...document.querySelectorAll(EChapterSelector.selector)].map(
      (el: Element) => {
        return {
          urlChapter: el.getAttribute(EChapterAttribute.href),
          chapter: Number(el.innerHTML),
        };
      },
    );
  }
  private async _getImgsChapter(url: string): Promise<IImage[]> {
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParseService.parseHtml(body);
    return [...document.querySelectorAll(EImageSelector.selector)].map(
      (el: Element, aux: number) => {
        return {
          url: el.getAttribute(EImageAttribute.src),
          page: aux,
        };
      },
    );
  }
}
