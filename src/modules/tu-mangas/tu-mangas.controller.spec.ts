import { Test, TestingModule } from '@nestjs/testing';
import { TuMangasController } from './tu-mangas.controller';
import { TuMangasService } from './tu-mangas.service';

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
            getMangaInfo: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TuMangasController>(TuMangasController);
    tuMangasService = module.get<TuMangasService>(TuMangasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array with the chapters of a specific manga', async () => {
    const expectResponse = [
      {
        url: '...',
        chapterNumber: 6,
        images: [
          {
            url: 'img1...',
          },
        ],
      },
    ];
    const param = 'www.manga.com/name=mange1';
    const getMangaInfoSpy = jest
      .spyOn(tuMangasService, 'getMangaInfo')
      .mockResolvedValue(expectResponse);

    const result = await controller.getListCharacters(param);
    expect(result).toBeDefined();
    expect(result).toEqual(expectResponse);
    expect(getMangaInfoSpy).toHaveBeenCalled();
  });
});
