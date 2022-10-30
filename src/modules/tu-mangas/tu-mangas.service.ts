import { Injectable } from '@nestjs/common';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import { EChapterList, EChartepListImgs } from './enums';

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
    const url = `https://tumangas.net/manga/${name}`;
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
