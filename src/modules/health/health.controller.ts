import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { IHealthResponse } from './models';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/')
  health(): IHealthResponse {
    return this.healthService.liveness();
  }
}
