import { Injectable } from '@nestjs/common';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import { EChapterList, EChartepListImgs, EMangaSelector } from './enums';
import { BASE_SEARCH_URL } from './constants';
import {
  IMangaScrapingService,
  IOutboundChapter,
  IOutboundGetParams,
  IOutboundSearchParams,
  IOutboundSearchResponse,
} from '../../interfaces';

interface IChapter {
  id: number;
  name: string;
  url: string;
}

@Injectable()
export class TuMangasService implements IMangaScrapingService {
  constructor(
    private readonly httpService: HttpService,
    private readonly htmlParseService: HtmlParserService,
  ) {}

  async search({
    value,
  }: IOutboundSearchParams): Promise<IOutboundSearchResponse[]> {
    const url = `${BASE_SEARCH_URL}${value}`;
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParseService.parseHtml(body);
    return [...document.querySelectorAll(EMangaSelector.mangas)].map((el) => {
      const splitName = el.getAttribute(EMangaSelector.href).split('/');
      const nameManga = splitName[splitName.length - 1].replace(/-/g, ' ');
      return { name: nameManga, url: el.getAttribute(EMangaSelector.href) };
    });
  }

  async get({ url }: IOutboundGetParams): Promise<IOutboundChapter[]> {
    const listChapters = await this._getListChapters(url);
    const infoManga = listChapters.map(async (chapter: IChapter) => {
      const { id, name, url } = chapter;
      return {
        id,
        name,
        images: await this._getListImgs(url),
      };
    });
    return Promise.all(infoManga);
  }

  private async _getListChapters(url: string) {
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParseService.parseHtml(body);
    return [...document.querySelectorAll(EChapterList.items)].map(
      (el: Element) => {
        const chapterName = el.children[0].innerHTML;
        const chapterNumber = chapterName.split(' ')[1];
        return {
          url: el.getAttribute(EChapterList.href),
          id: Number(chapterNumber),
          name: chapterName,
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
