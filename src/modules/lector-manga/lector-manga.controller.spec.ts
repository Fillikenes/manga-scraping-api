import { Test, TestingModule } from '@nestjs/testing';
import { LectorMangaController } from './lector-manga.controller';
import { LectorMangaService } from './lector-manga.service';
import { expectRequest, mockParam } from './mocks/index';

describe('LectorMangaController', () => {
  let controller: LectorMangaController;
  let service: LectorMangaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectorMangaController],
      providers: [
        {
          provide: LectorMangaService,
          useValue: {
            getInfoManga: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LectorMangaController>(LectorMangaController);
    service = module.get<LectorMangaService>(LectorMangaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('#getManga - return a list of all chapter with the images', async () => {
    const getInfoMangaSpy = jest
      .spyOn(service, 'getInfoManga')
      .mockResolvedValue(expectRequest);
    const result = await controller.getManga(mockParam.manga);
    expect(result).toBeDefined();
    expect(getInfoMangaSpy).toHaveBeenCalled();
  });
});
