import { Test, TestingModule } from '@nestjs/testing';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import { HttpService } from '../../services/http/http.service';
import { AnzMangaService } from './anz-manga.service';

describe('AnzMangaService', () => {
  let service: AnzMangaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnzMangaService,
        {
          provide: HttpService,
          useValue: {},
        },
        {
          provide: HtmlParserService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AnzMangaService>(AnzMangaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
