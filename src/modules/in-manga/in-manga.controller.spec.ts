import { Test, TestingModule } from '@nestjs/testing';
import { InMangaController } from './in-manga.controller';
import { InMangaService } from './in-manga.service';

describe('InMangaController', () => {
  let controller: InMangaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InMangaController],
      providers: [
        {
          provide: InMangaService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<InMangaController>(InMangaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
