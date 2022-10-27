import { Test, TestingModule } from '@nestjs/testing';
import { LectorMangaService } from './lector-manga.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import { HttpService } from '../../services/http/http.service';
import {
  chapters,
  imgs,
  listChapters,
  listImgsChapter,
  mockParam,
} from './mocks/index';
import { EChapterAttribute, EImageAttribute } from './enuns/index';

describe('LectorMangaService', () => {
  let service: LectorMangaService;
  let httpService: HttpService;
  let htmlParserService: HtmlParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LectorMangaService,
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

    service = module.get<LectorMangaService>(LectorMangaService);
    httpService = module.get<HttpService>(HttpService);
    htmlParserService = module.get<HtmlParserService>(HtmlParserService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it should return a list of chapters with info', async () => {
    const chapterResponse = {
      body: listChapters,
    };

    const imgsChapterResponse = {
      body: listImgsChapter,
    };

    const chapterElementMock = chapters.map((chapter) => ({
      getAttribute: jest.fn().mockImplementationOnce((selector: string) => {
        const selectorFn = {
          [EChapterAttribute.href]: chapter.urlChapter,
        };
        return selectorFn[selector];
      }),
      innerHTML: chapter.chapter,
    }));

    const imgElementMock = imgs.map((img, aux) => ({
      getAttribute: jest.fn().mockImplementation((selector: string) => {
        const selectorFn = {
          [EImageAttribute.src]: img.url,
        };
        return selectorFn[selector];
      }),
      page: aux,
    }));

    const getChapters = jest
      .spyOn(httpService, 'get')
      .mockResolvedValueOnce(chapterResponse);

    const getChaptersHtml = jest
      .spyOn(htmlParserService, 'parseHtml')
      .mockImplementationOnce((body) => {
        expect(body).toEqual(listChapters);
        return {
          querySelectorAll: jest.fn().mockReturnValueOnce(chapterElementMock),
        } as any;
      });

    const getImgsChapter = jest
      .spyOn(httpService, 'get')
      .mockResolvedValue(imgsChapterResponse);

    const getIgmsChapterHtml = jest
      .spyOn(htmlParserService, 'parseHtml')
      .mockImplementation((body) => {
        expect(body).toEqual(listImgsChapter);
        return {
          querySelectorAll: jest.fn().mockReturnValue(imgElementMock),
        } as any;
      });

    const result = await service.getInfoManga(mockParam.manga);
    expect(getChapters).toBeCalled();
    expect(getChaptersHtml).toBeCalled();
    expect(getImgsChapter).toBeCalled();
    expect(getIgmsChapterHtml).toBeCalled();
    expect(result).toEqual(chapters);
  });
});
