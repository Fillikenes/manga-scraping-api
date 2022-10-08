import { Injectable } from '@nestjs/common';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import { HttpService } from '../../services/http/http.service';

/**
 * Sequentail: 1 min 30 sec
 * Parallel: 8 sec
 */
@Injectable()
export class AnzMangaService {
  constructor(
    private readonly httpService: HttpService,
    private readonly htmlParser: HtmlParserService,
  ) {}

  public async getPage(url: string) {
    const chapters = await this._getChaptersInformation(url);
    const chaptersImagesPromises = chapters.map(async (chapter) => {
      const images = await this._getChapterImagesInformation(chapter.url);
      return {
        ...chapter,
        images,
      };
    });

    return Promise.all(chaptersImagesPromises);
  }

  private async _getChaptersInformation(url: string) {
    const { body } = await this.httpService.get(url);
    const document = await this.htmlParser.parseHtml(body);
    return [...document.querySelectorAll('ul.chapters > li')].map((element) => {
      const chapterInformation = element.querySelector('h5');
      const urlInformation = chapterInformation.querySelector('a');
      const url = urlInformation.getAttribute('href');
      const id = urlInformation.textContent;
      const name = chapterInformation.querySelector('em').textContent;
      return { id, name, url };
    });
  }

  private async _getChapterImagesInformation(url: string) {
    const { body } = await this.httpService.get(url);
    const document = await this.htmlParser.parseHtml(body);
    return [...document.querySelectorAll('#all > img')].map((element) => {
      const url = element.getAttribute('data-src').trim();
      const correlative = parseInt(
        element.getAttribute('alt').split(' - Page ')[1],
      );
      return {
        url,
        correlative,
      };
    });
  }
}
