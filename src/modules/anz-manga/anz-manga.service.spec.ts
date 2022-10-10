import { Test, TestingModule } from '@nestjs/testing';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import { HttpService } from '../../services/http/http.service';
import { AnzMangaService } from './anz-manga.service';
import { BASE_MANGA_PAGE_URL, BASE_SEARCH_URL } from './constants';
import { EChapterImageAttribute, EChapterSelector } from './enums';
import { ISuggestionResponse } from './models';

describe('AnzMangaService', () => {
  let service: AnzMangaService;
  let httpService: HttpService;
  let htmlParserService: HtmlParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnzMangaService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: HtmlParserService,
          useValue: {
            parseHtml: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AnzMangaService>(AnzMangaService);
    httpService = module.get<HttpService>(HttpService);
    htmlParserService = module.get<HtmlParserService>(HtmlParserService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#search', () => {
    it('should get all suggestions of mangas based in the argument value', async () => {
      const params = 'one punch';
      const response: ISuggestionResponse = {
        suggestions: [
          {
            value: 'One Piece',
            data: 'one-piece',
          },
          {
            value: 'One Punch-Man',
            data: 'one-punchman',
          },
          {
            value: 'Dr. Stone',
            data: 'dr-stone',
          },
          {
            value: 'Goblin Slayer: Side Story Year One',
            data: 'goblin-slayer-side-story-year-one',
          },
          {
            value: 'One Piece Episode ACE',
            data: 'one-piece-episode-ace',
          },
        ],
      };
      const expectedResponse = response.suggestions.map(({ value, data }) => ({
        name: value,
        url: `${BASE_MANGA_PAGE_URL}/${data}`,
      }));
      const getSpy = jest.spyOn(httpService, 'get').mockResolvedValue(response);

      const result = await service.search(params);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(getSpy).toHaveBeenCalledWith({
        url: BASE_SEARCH_URL,
        query: { query: params },
        isJson: true,
      });
    });
  });

  describe('#getPage', () => {
    it('should get all the information associated with a manga based in the url given as argument', async () => {
      const params = 'https://www.anzmangashd.com/manga/one-piece-episode-ace';
      const responseChapters = {
        body: '<h1>TEST</h1>',
      };
      const responseImages = {
        body: '<img src="image.jpg" />',
      };
      const expectedResponse = [...Array(10).keys()].map((value) => ({
        id: value,
        name: `Capitulo ${value}`,
        url: `${params}/${value}`,
        images: [
          { url: '-', correlative: 1 },
          { url: '-', correlative: 2 },
        ],
      }));
      jest.spyOn(httpService, 'get').mockImplementationOnce(async ({ url }) => {
        expect(url).toEqual(params);
        return responseChapters;
      });
      const chaptersElementsMock = expectedResponse.map((chapter, index) => ({
        querySelector: jest.fn().mockImplementation((selector: string) => {
          const selectorFn = {
            [EChapterSelector.Url]: {
              textContent: chapter.name,
              getAttribute: jest.fn().mockReturnValue(chapter.url),
            },
            [EChapterSelector.Name]: {
              textContent: index % 2 ? '' : chapter.name,
              getAttribute: jest.fn().mockReturnValue(''),
            },
          };
          return selectorFn[selector];
        }),
      }));
      jest
        .spyOn(htmlParserService, 'parseHtml')
        .mockImplementationOnce(async (body) => {
          expect(body).toEqual(responseChapters.body);
          return {
            querySelectorAll: jest.fn().mockReturnValue(chaptersElementsMock),
          } as any;
        });
      let indexCurrentImagesChapter = 0;
      jest.spyOn(httpService, 'get').mockResolvedValue(responseImages);
      jest
        .spyOn(htmlParserService, 'parseHtml')
        .mockImplementation(async (body) => {
          expect(body).toEqual(responseImages.body);
          const imagesElementsMock = expectedResponse[
            indexCurrentImagesChapter
          ].images.map((image) => ({
            getAttribute: jest.fn().mockImplementation((selector: string) => {
              const selectorFn = {
                [EChapterImageAttribute.DataSrc]: image.url,
                [EChapterImageAttribute.Alt]: `Manga - Page ${image.correlative}`,
              };
              return selectorFn[selector];
            }),
          }));
          indexCurrentImagesChapter++;
          return {
            querySelectorAll: jest.fn().mockReturnValue(imagesElementsMock),
          } as any;
        });

      const result = await service.getPage(params);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
    });
  });
});
