import { Injectable } from '@nestjs/common';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import { EChapterList, EChartepListImgs, EMangaSelector } from './enums';
import { BASE_MANGA_URL, BASE_SEARCH_URL } from './constants';

interface IChapter {
  url: string;
  chapterNumber: number;
}

@Injectable()
export class TuMangasService {
  constructor(
    private readonly httpService: HttpService,
    private readonly htmlParseService: HtmlParserService,
  ) {}

  async searchManga(name: string) {
    const url = `${BASE_SEARCH_URL}${name}`;
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParseService.parseHtml(body);
    return [...document.querySelectorAll(EMangaSelector.mangas)].map((el) => {
      const splitName = el.getAttribute(EMangaSelector.href).split('/');
      const nameManga = splitName[splitName.length - 1].replace(/-/g, ' ');
      return { name: nameManga, url: el.getAttribute(EMangaSelector.href) };
    });
  }

  async getMangaInfo(name: string) {
    const listChapters = await this._getListChapters(name);
    const infoManga = listChapters.map(async (chapter: IChapter) => {
      return {
        ...chapter,
        images: await this._getListImgs(chapter.url),
      };
    });
    return Promise.all(infoManga);
  }

  private async _getListChapters(name: string) {
    const url = `${BASE_MANGA_URL}${name}`;
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParseService.parseHtml(body);
    return [...document.querySelectorAll(EChapterList.items)].map(
      (el: Element) => {
        const chapter = el.innerHTML.split(EChapterList.charSplit)[1];
        const chapterNumber = Number(chapter);
        return {
          url: el.getAttribute(EChapterList.href),
          chapterNumber,
        };
      },
    );
  }

  private async _getListImgs(url: string) {
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParseService.parseHtml(body);
    return [...document.querySelectorAll(EChartepListImgs.imgs)].map(
      (el: Element, aux: number) => {
        return {
          url: el.getAttribute(EChartepListImgs.src),
          correlative: aux + 1,
        };
      },
    );
  }
}
