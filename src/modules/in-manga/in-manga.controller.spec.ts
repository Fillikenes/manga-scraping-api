import { Test, TestingModule } from '@nestjs/testing';
import { InMangaController } from './in-manga.controller';
import { InMangaService } from './in-manga.service';
import { InMangaParamDto } from './dto';
import { mangaResponse, searchResponse } from './mocks';

describe('InMangaController', () => {
  let controller: InMangaController;
  let service: InMangaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InMangaController],
      providers: [
        {
          provide: InMangaService,
          useValue: {
            getManga: jest.fn(),
            searchManga: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InMangaController>(InMangaController);
    service = module.get<InMangaService>(InMangaService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#get', () => {
    it('should get the information of a manga based in the manga name', async () => {
      const params: InMangaParamDto = {
        manga: 'One Piece',
      };
      const getMangaSpy = jest
        .spyOn(service, 'getManga')
        .mockResolvedValue(mangaResponse);

      const result = await controller.get(params);

      expect(result).toBeDefined();
      expect(result).toEqual(mangaResponse);
      expect(getMangaSpy).toHaveBeenCalledWith(params.manga);
    });
  });

  describe('#search', () => {
    it('should get the information of a manga based in the manga name', async () => {
      const params: InMangaParamDto = {
        manga: 'One Piece',
      };
      const searchMangaSpy = jest
        .spyOn(service, 'searchManga')
        .mockResolvedValue(searchResponse);

      const result = await controller.search(params);

      expect(result).toBeDefined();
      expect(result).toEqual(searchResponse);
      expect(searchMangaSpy).toHaveBeenCalledWith(params.manga);
    });
  });
});
