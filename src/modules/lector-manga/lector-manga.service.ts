import { Injectable } from '@nestjs/common';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';

@Injectable()
export class LectorMangaService {
  constructor(
    private readonly httpService: HttpService,
    private readonly htmlParseService: HtmlParserService,
  ) {}

  async getInfoManga(nameManga: string) {
    const chapterList = await this._getChapters(nameManga);
    const promises = chapterList.map(async (el) => {
      const infoImgs = await this._getImgsChapter(el.urlChapter);
      return { ...el, infoImgs };
    });
    return Promise.all(promises);
  }

  private _getChapters = async (nameManga: string) => {
    const url = `https://lectormanga.online/manga/${nameManga}/`;
    const { body } = await this.httpService.get({
      url,
    });
    const document = await this.htmlParseService.parseHtml(body);
    return [...document.querySelectorAll('ul.main>li>a')].map((el: Element) => {
      return {
        urlChapter: el.getAttribute('href'),
        chapter: Number(el.innerHTML),
      };
    });
  };
  private _getImgsChapter = async (url: string) => {
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParseService.parseHtml(body);
    return [
      ...document.querySelectorAll('div.reading-content>div.page-break>img'),
    ].map((el: Element, aux: number) => {
      return {
        url: el.getAttribute('data-lazy-src'),
        page: aux,
      };
    });
  };
}
