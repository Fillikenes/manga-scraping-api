import { Injectable } from '@nestjs/common';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import { HttpService } from '../../services/http/http.service';
import { BASE_MANGA_PAGE_URL, BASE_SEARCH_URL } from './constants';
import {
  EChapterAttribute,
  EChapterImageAttribute,
  EChapterImageSeparator,
  EChapterImageSeparatorDescription,
  EChapterSelector,
  EChapterSeparator,
  EChapterSeparatorName,
  EChaptersSelector,
} from './enums';
import { IChapter, IChapterImage, ISuggestionResponse } from './models';

@Injectable()
export class AnzMangaService {
  constructor(
    private readonly httpService: HttpService,
    private readonly htmlParser: HtmlParserService,
  ) {}

  public async search(value: string) {
    const { suggestions }: ISuggestionResponse = await this.httpService.get({
      url: BASE_SEARCH_URL,
      query: value,
      isJson: true,
    });
    const response = suggestions.map((suggestion) => ({
      name: suggestion.value,
      url: `${BASE_MANGA_PAGE_URL}/${suggestion.data}`,
    }));
    return response;
  }

  public async getPage(url: string): Promise<IChapter[]> {
    const chapters = await this._getChapters(url);
    const chaptersImagesPromises = chapters.map(async (chapter) => {
      return {
        ...chapter,
        images: await this._getChapterImages(chapter.url),
      };
    });

    return Promise.all(chaptersImagesPromises);
  }

  private async _getChapters(url: string): Promise<IChapter[]> {
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParser.parseHtml(body);
    return [...document.querySelectorAll(EChaptersSelector.Items)].map(
      (element) => {
        const urlSection = element.querySelector(EChapterSelector.Url);
        const title = urlSection.textContent;
        const id = Number(
          title
            .split(EChapterSeparator.Name)
            .at(EChapterSeparatorName.Identifier),
        );
        const url = urlSection.getAttribute(EChapterAttribute.Href);
        const name = element.querySelector(EChapterSelector.Name).textContent;
        return {
          id,
          name: name || title,
          url,
          images: [],
        };
      },
    );
  }

  private async _getChapterImages(url: string): Promise<IChapterImage[]> {
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParser.parseHtml(body);
    return [...document.querySelectorAll(EChapterSelector.Images)].map(
      (element) => {
        const url = element.getAttribute(EChapterImageAttribute.DataSrc).trim();
        const correlative = parseInt(
          element
            .getAttribute(EChapterImageAttribute.Alt)
            .split(EChapterImageSeparator.Description)[
            EChapterImageSeparatorDescription.Correlative
          ],
        );
        return {
          correlative,
          url,
        };
      },
    );
  }
}
