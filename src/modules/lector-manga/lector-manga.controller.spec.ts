import { Test, TestingModule } from '@nestjs/testing';
import { LectorMangaController } from './lector-manga.controller';

describe('LectorMangaController', () => {
  let controller: LectorMangaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectorMangaController],
    }).compile();

    controller = module.get<LectorMangaController>(LectorMangaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
