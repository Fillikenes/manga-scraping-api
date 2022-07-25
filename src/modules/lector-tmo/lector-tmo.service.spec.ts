import { Test, TestingModule } from '@nestjs/testing';
import { LectorTmoService } from './lector-tmo.service';

describe('LectorTmoService', () => {
  let service: LectorTmoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectorTmoService],
    }).compile();

    service = module.get<LectorTmoService>(LectorTmoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
