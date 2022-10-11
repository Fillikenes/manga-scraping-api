import { Test, TestingModule } from '@nestjs/testing';
import { InMangaService } from './in-manga.service';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import {
  chaptersInfo,
  imageHtmlInfo,
  imagesInfo,
  searchResponse,
} from './mocks';
import { BASE_SEARCH_MANGA_URL } from './constants';
import { EChapterImageAttribute } from './enums';

describe('InMangaService', () => {
  let service: InMangaService;
  let httpService: HttpService;
  let htmlParserService: HtmlParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InMangaService,
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

    service = module.get<InMangaService>(InMangaService);
    httpService = module.get<HttpService>(HttpService);
    htmlParserService = module.get<HtmlParserService>(HtmlParserService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#searchManga', () => {
    it('should get all results of mangas based in the argument value', async () => {
      const params = 'One Piece';
      const response = { data: JSON.stringify(searchResponse) };
      const getSpy = jest.spyOn(httpService, 'get').mockResolvedValue(response);

      const result = await service.searchManga(params);

      expect(result).toBeDefined();
      expect(result).toEqual(searchResponse);
      expect(getSpy).toHaveBeenCalledWith({
        url: BASE_SEARCH_MANGA_URL,
        query: { name: params },
        isJson: true,
      });
    });
  });

  describe('#getManga', () => {
    it('should get all the information associated with a manga based in manga given as argument', async () => {
      const params = 'One Piece';
      const searchSpy = jest
        .spyOn(service, 'searchManga')
        .mockResolvedValue(searchResponse);

      const chapterResponse = {
        data: JSON.stringify({ result: chaptersInfo }),
      };
      const getChapterSpy = jest
        .spyOn(httpService, 'get')
        .mockResolvedValueOnce(chapterResponse);

      const getImageHtmlSpy = jest
        .spyOn(httpService, 'get')
        .mockResolvedValue(imageHtmlInfo);

      const getImageSpy = jest
        .spyOn(htmlParserService, 'parseHtml')
        .mockImplementation(async (body) => {
          expect(body).toEqual(imageHtmlInfo.body);
          const imagesElementsMock = imagesInfo.map((image) => ({
            getAttribute: jest.fn().mockImplementation((selector: string) => {
              const selectorFn = {
                [EChapterImageAttribute.Value]: image.altId,
              };
              return selectorFn[selector];
            }),
          }));
          return {
            querySelectorAll: jest.fn().mockReturnValue(imagesElementsMock),
          } as any;
        });

      const result = await service.getManga(params);

      expect(result).toBeDefined();
      expect(searchSpy).toBeCalledTimes(1);
      expect(getChapterSpy).toHaveBeenCalled();
      expect(getImageHtmlSpy).toHaveBeenCalled();
      expect(getImageSpy).toBeCalledTimes(2);
    });
  });
});
