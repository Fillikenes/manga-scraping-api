import { Injectable } from '@nestjs/common';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import { EChapterList, EChartepListImgs } from './enums';

@Injectable()
export class TuMangasService {
  constructor(
    private readonly httpService: HttpService,
    private readonly htmlParseService: HtmlParserService,
  ) {}

  async getMangaInfo(name: string) {
    const listChapters = await this._getListChapters(name);
    const infoManga = listChapters.map(async (chapter) => {
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
        const chapterName = el.innerHTML.trim();
        const chapterNumber = parseFloat(chapterName.match(/\d+/g).join('.'));
        return {
          url: el.getAttribute(EChapterList.href),
          chapterNumber: chapterNumber,
        };
      },
    );
  }

  private async _getListImgs(url: string) {
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParseService.parseHtml(body);
    return [...document.querySelectorAll(EChartepListImgs.imgs)].map((el) => {
      return { url: el.getAttribute(EChartepListImgs.src) };
    });
  }
}
