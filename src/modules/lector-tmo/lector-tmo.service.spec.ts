import { Test, TestingModule } from '@nestjs/testing';
import { LectorTmoService } from './lector-tmo.service';
import { PuppeteerService } from '../../services/puppeteer/puppeteer.service';

describe('LectorTmoService', () => {
  let service: LectorTmoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LectorTmoService,
        {
          provide: PuppeteerService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<LectorTmoService>(LectorTmoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
