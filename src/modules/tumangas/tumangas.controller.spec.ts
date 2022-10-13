import { Test, TestingModule } from '@nestjs/testing';
import { TumangasController } from './tumangas.controller';
import { TumangasService } from './tumangas.service';

describe('TumangasController', () => {
  let controller: TumangasController;
  let tuMangasService: TumangasService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TumangasController],
      providers: [
        {
          provide: TumangasService,
          useValue: {
            getMangaInfo: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TumangasController>(TumangasController);
    tuMangasService = module.get<TumangasService>(TumangasService);
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
