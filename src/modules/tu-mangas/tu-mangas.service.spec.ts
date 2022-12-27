import { Test, TestingModule } from '@nestjs/testing';
import { TuMangasService } from './tu-mangas.service';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import { EChapterList, EChartepListImgs, EMangaSelector } from './enums';
// import { EMangaSelector } from './enums/index';
import {
  listChapters,
  chapters,
  listImgsChapter,
  imgs,
  expectRequest,
  listMangas,
  mangas,
} from './mocks';

describe('TumangasService', () => {
  let service: TuMangasService;
  let httpService: HttpService;
  let htmlParserService: HtmlParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TuMangasService,
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

    service = module.get<TuMangasService>(TuMangasService);
    httpService = module.get<HttpService>(HttpService);
    htmlParserService = module.get<HtmlParserService>(HtmlParserService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all information about a manga using a name valid to TuMangas webpage', async () => {
    const nameManga = 'el-salvaje-oeste-marcial';
    const chapterResponse = {
      body: listChapters,
    };
    const chapterImgsResponse = {
      body: listImgsChapter,
    };
    const chapterElementsMock = chapters.map((chapter) => ({
      getAttribute: jest.fn().mockImplementationOnce((selector: string) => {
        const selectorFn = {
          [EChapterList.href]: chapter.url,
        };
        return selectorFn[selector];
      }),
      innerHTML: {
        split: jest.fn().mockReturnValue([, chapter.chapterNumber]),
      },
    }));
    const imagesElementsMock = imgs.map((img, aux) => {
      return {
        getAttribute: jest.fn().mockImplementation((selector: string) => {
          const selectorFn = {
            [EChartepListImgs.src]: img.url,
          };
          return selectorFn[selector];
        }),
        correlative: aux,
      };
    });

    const getListChapterHttp = jest
      .spyOn(httpService, 'get')
      .mockResolvedValueOnce(chapterResponse);

    const getListChapterHtml = jest
      .spyOn(htmlParserService, 'parseHtml')
      .mockImplementationOnce(async (body) => {
        expect(body).toEqual(listChapters);
        return {
          querySelectorAll: jest.fn().mockReturnValueOnce(chapterElementsMock),
        } as any;
      });

    const getImagesListChapterHttp = jest
      .spyOn(httpService, 'get')
      .mockResolvedValue(chapterImgsResponse);

    const getImagesListChapterHtml = jest
      .spyOn(htmlParserService, 'parseHtml')
      .mockImplementation(async (body) => {
        expect(body).toEqual(listImgsChapter);
        return {
          querySelectorAll: jest.fn().mockReturnValue(imagesElementsMock),
        } as any;
      });

    const result = await service.getMangaInfo(nameManga);
    expect(getListChapterHttp).toBeCalled();
    expect(getListChapterHtml).toBeCalled();
    expect(getImagesListChapterHttp).toBeCalled();
    expect(getImagesListChapterHtml).toBeCalled();
    expect(result).toEqual(expectRequest);
  });

  it('should return a list of mangas find in the page tu mangas', async () => {
    const searchManga = 'solo';
    const mangasResponse = {
      body: listMangas,
    };

    const mangasElementsMock = mangas.map((manga) => ({
      getAttribute: jest.fn().mockImplementation((selector: string) => {
        const selectorFn = {
          [EMangaSelector.href]: manga.url,
        };
        return selectorFn[selector];
      }),
    }));

    const getListMangasHttp = jest
      .spyOn(httpService, 'get')
      .mockResolvedValueOnce(mangasResponse);

    const getListMangasHtml = jest
      .spyOn(htmlParserService, 'parseHtml')
      .mockImplementationOnce(async (body) => {
        expect(body).toEqual(listMangas);
        return {
          querySelectorAll: jest.fn().mockReturnValueOnce(mangasElementsMock),
        } as any;
      });

    const result = await service.searchManga(searchManga);
    expect(getListMangasHttp).toBeCalled();
    expect(getListMangasHtml).toBeCalled();
    expect(result).toEqual(mangas);
  });
});
