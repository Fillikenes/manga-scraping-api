import { Test, TestingModule } from '@nestjs/testing';
import { LectorMangaService } from './lector-manga.service';

describe('LectorMangaService', () => {
  let service: LectorMangaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectorMangaService],
    }).compile();

    service = module.get<LectorMangaService>(LectorMangaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
