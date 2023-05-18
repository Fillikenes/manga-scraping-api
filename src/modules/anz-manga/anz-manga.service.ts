import { Injectable } from '@nestjs/common';
import {
  IMangaScrapingService,
  IOutboundChapter,
  IOutboundGetParams,
  IOutboundImage,
  IOutboundSearchParams,
  IOutboundSearchResponse,
} from '../../interfaces';
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
  ISuggestionItemResponse,
  ISuggestionResponse,
} from './models';

@Injectable()
export class AnzMangaService implements IMangaScrapingService {
  constructor(
    private readonly httpService: HttpService,
    private readonly htmlParser: HtmlParserService,
  ) {}

  public async search({
    value,
  }: IOutboundSearchParams): Promise<IOutboundSearchResponse[]> {
    const { suggestions }: ISuggestionResponse = await this.httpService.get({
      url: BASE_SEARCH_URL,
      query: { query: value },
      isJson: true,
    });
    console.log('Serach services anz manga - suggestions', suggestions);
    return suggestions.map((suggestion: ISuggestionItemResponse) => {
      return {
        name: suggestion.value,
        url: `${BASE_MANGA_PAGE_URL}/${suggestion.data}`,
      };
    });
  }

  public async get({ url }: IOutboundGetParams): Promise<IOutboundChapter[]> {
    const chapters = await this._getChapters(url);
    console.log('Ger services anz manga - chapters', chapters);
    const chaptersImagesPromises = chapters.map(async (chapter: IChapter) => {
      return {
        id: chapter.id,
        name: chapter.name,
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
        const url = urlSection.getAttribute(EChapterAttribute.Href);
        const titleSplit = title.split(EChapterSeparator.Name);
        const id = Number(titleSplit[titleSplit.length - 1]);
        const name = element.querySelector(EChapterSelector.Name).textContent;
        return {
          id,
          url,
          name: name || title,
          images: [],
        };
      },
    );
  }

  private async _getChapterImages(url: string): Promise<IOutboundImage[]> {
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
