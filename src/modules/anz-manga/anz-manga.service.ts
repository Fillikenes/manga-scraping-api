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
  EChaptersSelector,
} from './enums';
import {
  IChapter,
  IChapterImage,
  ISuggestionItemResponse,
  ISuggestionResponse,
} from './models';

@Injectable()
export class AnzMangaService {
  constructor(
    private readonly httpService: HttpService,
    private readonly htmlParser: HtmlParserService,
  ) {}

  public async search(value: string) {
    const { suggestions }: ISuggestionResponse = await this.httpService.get({
      url: BASE_SEARCH_URL,
      query: { query: value },
      isJson: true,
    });
    return suggestions.map((suggestion: ISuggestionItemResponse) => {
      return {
        name: suggestion.value,
        url: `${BASE_MANGA_PAGE_URL}/${suggestion.data}`,
      };
    });
  }

  public async getPage(url: string): Promise<IChapter[]> {
    const chapters = await this._getChapters(url);
    const chaptersImagesPromises = chapters.map(async (chapter: IChapter) => {
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
      (element: Element) => {
        const urlSection = element.querySelector(EChapterSelector.Url);
        const title = urlSection.textContent;
        const titleSplit = title.split(EChapterSeparator.Name);
        const id = Number(titleSplit[titleSplit.length - 1]);
        const chapterUrl = urlSection.getAttribute(EChapterAttribute.Href);
        const name = element.querySelector(EChapterSelector.Name).textContent;
        return {
          id,
          name: name || title,
          url: chapterUrl,
          images: [],
        };
      },
    );
  }

  private async _getChapterImages(url: string): Promise<IChapterImage[]> {
    const { body } = await this.httpService.get({ url });
    const document = await this.htmlParser.parseHtml(body);
    return [...document.querySelectorAll(EChapterSelector.Images)].map(
      (element: Element) => {
        const imageUrl = element
          .getAttribute(EChapterImageAttribute.DataSrc)
          .trim();
        const correlative = Number(
          element
            .getAttribute(EChapterImageAttribute.Alt)
            .split(EChapterImageSeparator.Description)[
            EChapterImageSeparatorDescription.Correlative
          ],
        );
        return {
          correlative,
          url: imageUrl,
        };
      },
    );
  }
}
