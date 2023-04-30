import { Test, TestingModule } from '@nestjs/testing';
import { TuMangasService } from './tu-mangas.service';
import { TuMangasController } from './tu-mangas.controller';
import { TuMangasGetListDto, TuMangasSearchDto } from './dtos';

describe('TumangasController', () => {
  let controller: TuMangasController;
  let tuMangasService: TuMangasService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TuMangasController],
      providers: [
        {
          provide: TuMangasService,
          useValue: {
            get: jest.fn(),
            search: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TuMangasController>(TuMangasController);
    tuMangasService = module.get<TuMangasService>(TuMangasService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array with the chapters of a specific manga', async () => {
    const expectResponse = [
      {
        name: '...',
        id: 6,
        images: [
          {
            url: 'img1...',
            correlative: 1,
          },
        ],
      },
    ];
    const param: TuMangasGetListDto = {
      url: 'www.manga.com/name=mange1',
    };
    const getMangaInfoSpy = jest
      .spyOn(tuMangasService, 'get')
      .mockResolvedValue(expectResponse);

    const result = await controller.get(param);
    expect(result).toBeDefined();
    expect(result).toEqual(expectResponse);
    expect(getMangaInfoSpy).toHaveBeenCalled();
  });

  it('should return an array with mangas searched', async () => {
    const expectResponse = [
      {
        url: '...',
        name: 'solo',
      },
    ];
    const param: TuMangasSearchDto = {
      value: 'solo',
    };
    const getMangaInfoSpy = jest
      .spyOn(tuMangasService, 'search')
      .mockResolvedValue(expectResponse);

    const result = await controller.search(param);
    expect(result).toBeDefined();
    expect(result).toEqual(expectResponse);
    expect(getMangaInfoSpy).toHaveBeenCalled();
  });
});
