import { Test, TestingModule } from '@nestjs/testing';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';
import { HttpService } from '../../services/http/http.service';
import { TmoLectorNetService } from './tmo-lector-net.service';

describe('TmoLectorNetService', () => {
  let service: TmoLectorNetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TmoLectorNetService,
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

    service = module.get<TmoLectorNetService>(TmoLectorNetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
