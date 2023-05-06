import { Test, TestingModule } from '@nestjs/testing';
import Joi from 'joi';
import { ConfigService } from './config.service';
import { EEnvironment } from '../enums';

describe('ConfigService', () => {
  const previousEnv = process.env;
  let service: ConfigService;

  beforeAll(() => {
    process.env.ENVIRONMENT = EEnvironment.Development;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  afterAll(() => {
    process.env = previousEnv;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a valid config param', () => {
    expect(service.config).toBeDefined();
  });

  it('should return a error', () => {
    jest.spyOn(Joi, 'object').mockReturnValue({
      validate: jest.fn().mockReturnValue({ error: true }),
    } as any);

    expect(() => new ConfigService()).toThrow();
  });
});
