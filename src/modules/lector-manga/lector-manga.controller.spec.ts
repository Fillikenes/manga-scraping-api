import { Test, TestingModule } from '@nestjs/testing';
import { LectorMangaController } from './lector-manga.controller';
import { LectorMangaService } from './lector-manga.service';
import { expectRequest, mangas, mockParam } from './mocks/index';

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
            searchManga: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LectorMangaController>(LectorMangaController);
    service = module.get<LectorMangaService>(LectorMangaService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('#getManga - return a list of all chapter with the images', async () => {
    const getInfoMangaSpy = jest
      .spyOn(service, 'getInfoManga')
      .mockResolvedValue(expectRequest);
    const result = await controller.getManga(mockParam);
    expect(result).toBeDefined();
    expect(getInfoMangaSpy).toHaveBeenCalled();
  });

  it('#searchManga - return a list of all mangas finded', async () => {
    const searchMangaSpy = jest
      .spyOn(service, 'searchManga')
      .mockResolvedValue(mangas);
    const result = await controller.searchManga(mockParam);
    expect(result).toBeDefined();
    expect(searchMangaSpy).toHaveBeenCalled();
  });
});
