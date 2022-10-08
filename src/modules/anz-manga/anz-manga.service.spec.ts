import { Test, TestingModule } from '@nestjs/testing';
import { AnzMangaService } from './anz-manga.service';

describe('AnzMangaService', () => {
  let service: AnzMangaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnzMangaService],
    }).compile();

    service = module.get<AnzMangaService>(AnzMangaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
