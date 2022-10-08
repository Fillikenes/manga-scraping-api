import { Test, TestingModule } from '@nestjs/testing';
import { AnzMangaController } from './anz-manga.controller';
import { AnzMangaService } from './anz-manga.service';

describe('AnzMangaController', () => {
  let controller: AnzMangaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnzMangaController],
      providers: [
        {
          provide: AnzMangaService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AnzMangaController>(AnzMangaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
