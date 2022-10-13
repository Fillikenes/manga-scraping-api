import { Test, TestingModule } from '@nestjs/testing';
import { TumangasService } from './tumangas.service';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import { EChapterList, EChartepListImgs } from './enums/index';
import {
  listChapters,
  chapters,
  listImgsChapter,
  imgs,
  expectRequest,
} from './mocks/index';

describe('TumangasService', () => {
  let service: TumangasService;
  let httpService: HttpService;
  let htmlParserService: HtmlParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TumangasService,
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

    service = module.get<TumangasService>(TumangasService);
    httpService = module.get<HttpService>(HttpService);
    htmlParserService = module.get<HtmlParserService>(HtmlParserService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all information about a manga using a name valid to TuMangas webpage', async () => {
    const nameManga = 'one-punch-man';
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
        trim: jest.fn().mockReturnValue('Cap 1'),
      },
    }));
    const imagesElementsMock = imgs.map((img) => ({
      getAttribute: jest.fn().mockImplementation((selector: string) => {
        const selectorFn = {
          [EChartepListImgs.src]: img.url,
        };
        return selectorFn[selector];
      }),
    }));

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
});
