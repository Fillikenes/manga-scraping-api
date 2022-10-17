import { Injectable } from '@nestjs/common';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';

@Injectable()
export class TmoLectorNetService {
  constructor(
    private readonly httpService: HttpService,
    private readonly htmlParser: HtmlParserService,
  ) {}

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
