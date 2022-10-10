import { Test, TestingModule } from '@nestjs/testing';
import { InMangaService } from './in-manga.service';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';

describe('InMangaService', () => {
  let service: InMangaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InMangaService,
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

    service = module.get<InMangaService>(InMangaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
