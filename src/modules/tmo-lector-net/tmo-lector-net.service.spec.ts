import { Test, TestingModule } from '@nestjs/testing';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import { HttpService } from '../../services/http/http.service';
import { BASE_SEARCH_URL } from './constants';
import {
  EChapterAttribute,
  EChapterImageAttribute,
  EChapterSelector,
  EChaptersSelector,
  ESearchMangaAttribute,
  ESearchMangaImageAttribute,
  ESearchMangaSelector,
  ESearchMangasSelector,
} from './enums';
import { TmoLectorNetService } from './tmo-lector-net.service';

describe('TmoLectorNetService', () => {
  let service: TmoLectorNetService;
  let httpService: HttpService;
  let htmlParserService: HtmlParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TmoLectorNetService,
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

    service = module.get<TmoLectorNetService>(TmoLectorNetService);
    httpService = module.get<HttpService>(HttpService);
    htmlParserService = module.get<HtmlParserService>(HtmlParserService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#search', () => {
    it('should get a list of mangas that have a name similar to the search value given as argument', async () => {
      const params = {
        value: 'dragon',
        getAll: true,
      };
      const expectedPageBody = '<h1>TEST BODY DOCUMENT</h1>';
      let currentPage = 1;
      jest
        .spyOn(httpService, 'get')
        .mockImplementation(async ({ url, query }) => {
          expect(url).toEqual(BASE_SEARCH_URL);
          expect(query).toHaveProperty('search', params.value);
          expect(query).toHaveProperty('page', currentPage++);
          return {
            body: expectedPageBody,
          };
        });
      jest
        .spyOn(htmlParserService, 'parseHtml')
        .mockImplementation(async (body) => {
          expect(body).toEqual(expectedPageBody);
          return {
            querySelectorAll: (selector: string) => {
              const selectorFn = {
                [ESearchMangasSelector.Pages]: [
                  {
                    getAttribute: (attribute: string) => {
                      const attributeFn = {
                        [ESearchMangaAttribute.Href]: 'www.manga-url.com',
                        [ESearchMangaAttribute.Title]: 'Manga Name',
                      };
                      return attributeFn[attribute];
                    },
                    querySelector: (value: string) => {
                      const selectFn = {
                        [ESearchMangaSelector.Image]: {
                          getAttribute: (qualifiedName: string) => {
                            const attribFn = {
                              [ESearchMangaImageAttribute.Source]:
                                'www.image-url.com/asb.jpg',
                            };
                            return attribFn[qualifiedName];
                          },
                        },
                      };
                      return selectFn[value];
                    },
                  },
                ],
                [ESearchMangasSelector.Pagination]: [
                  {
                    textContent: '<',
                  },
                  {
                    textContent: '1',
                  },
                  {
                    textContent: '2',
                  },
                  {
                    textContent: '>',
                  },
                ],
              };
              return selectorFn[selector];
            },
          } as any;
        });

      const results = await service.search({ value: params.value });

      expect(results).toBeDefined();
      for (const result of results) {
        expect(result).toHaveProperty('url');
        expect(result).toHaveProperty('name');
      }
    });
  });

  describe('#getPage', () => {
    it('should get the information of a manga based in the url given as argument', async () => {
      const params = 'https://tmolector.net/manga/shonen-no-abyss-senkou-shojo';
      const expectedPageBody = '<h1>PAGE BODY</h1>';
      const expectedImageBody = `<h1>IMAGE BODY</h1>`;
      // PAGE INFO
      jest.spyOn(httpService, 'get').mockImplementationOnce(async ({ url }) => {
        expect(url).toEqual(params);
        return {
          body: expectedPageBody,
        };
      });
      jest
        .spyOn(htmlParserService, 'parseHtml')
        .mockImplementationOnce(async (body) => {
          expect(body).toEqual(expectedPageBody);
          return {
            querySelectorAll: (selector: string) => {
              const selFn = {
                [EChaptersSelector.Items]: [
                  {
                    textContent: 'Capítulo 1 : Al cuadrado',
                    getAttribute: (attribute) => {
                      const fns = {
                        [EChapterAttribute.Href]: 'www.tmolector.net/1',
                      };
                      return fns[attribute];
                    },
                  },
                ],
              };
              return selFn[selector];
            },
          } as any;
        });
      // IMAGES INFO
      jest.spyOn(httpService, 'get').mockResolvedValue({
        body: expectedImageBody,
      });
      jest
        .spyOn(htmlParserService, 'parseHtml')
        .mockImplementation(async (body) => {
          expect(body).toEqual(expectedImageBody);
          return {
            querySelectorAll: (selector: string) => {
              const selectorFn = {
                [EChapterSelector.Images]: [
                  {
                    getAttribute: (attribute) => {
                      const fns = {
                        [EChapterImageAttribute.DataSrc]: 'www.image.com/1.jpg',
                      };
                      return fns[attribute];
                    },
                  },
                ],
              };
              return selectorFn[selector];
            },
          } as any;
        });

      const result = await service.get({ url: params });

      expect(result).toBeDefined();
    });
  });
});
