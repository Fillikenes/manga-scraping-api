import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';

@Injectable()
export class TmoLectorNetService {
  constructor(
    private readonly httpService: HttpService,
    private readonly htmlParser: HtmlParserService,
  ) {}

  public async search(value: string, getAll = false) {
    const { results, hasMorePages, totalPages } =
      await this._getMangasFromSearch(value, 1);

    if (getAll && hasMorePages) {
      const searchPromises = _.range(2, totalPages + 1).map(
        async (pageNbr: number) => {
          const response = await this._getMangasFromSearch(value, pageNbr);
          return response.results;
        },
      );
      const responses = await Promise.all(searchPromises);
      results.push(..._.flattenDeep(responses));
    }

    return results;
  }

  private async _getMangasFromSearch(value: string, pageNbr: number) {
    const base_url = 'https://tmolector.net/biblioteca';
    const params = { query: { search: value, page: pageNbr }, url: base_url };
    const { body } = await this.httpService.get(params);
    const document = await this.htmlParser.parseHtml(body);
    const results = [
      ...document.querySelectorAll(
        '.manga_portada > .page-item-detail > .manga_biblioteca > a',
      ),
    ].map((element: Element) => {
      const url = element.getAttribute('href');
      const name = element.getAttribute('title');
      const thumbnail = element.querySelector('img').getAttribute('src');
      return {
        url,
        name,
        thumbnail,
      };
    });
    const { length, [length - 2]: totalPages } = [
      ...document.querySelectorAll('.pagination > .page-item'),
    ].map((item: Element) => Number(item.textContent));
    return {
      hasMorePages: !!totalPages,
      hasPreviousPage: totalPages ? 1 < pageNbr : false,
      hasNextPage: totalPages ? pageNbr < totalPages : false,
      totalPages,
      results,
    };
  }

  public async getPage(url: string) {
    const chapters = await this._getChapters(url);
    const chaptersImagesPromises = chapters.map(async (chapter: any) => {
      return {
        ...chapter,
        images: await this._getChapterImages(chapter.url),
      };
    });

    return Promise.all(chaptersImagesPromises);
  }

  private async _getChapters(url: string): Promise<any[]> {
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParser.parseHtml(body);
    return [
      ...document.querySelectorAll(
        '.sub-chap.list-chap > .wp-manga-chapter > a',
      ),
    ].map((element: Element) => {
      const [chapterInfo, name] = element.textContent.trim().split(' : '); // textContent => Capítulo 209.00 : Al cuadrado || Capítulo 201.00
      const id = Number(chapterInfo.replace('Capítulo ', ''));
      const url = element.getAttribute('href');
      return {
        id,
        url,
        name: name || chapterInfo,
      };
    });
  }

  private async _getChapterImages(url: string): Promise<any[]> {
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParser.parseHtml(body);
    return [...document.querySelectorAll('#images_chapter > img')].map(
      (element: Element, index: number) => {
        const url = element.getAttribute('data-src');
        return {
          url,
          correlative: index + 1,
        };
      },
    );
  }
}
