import { Injectable } from '@nestjs/common';
import { IHealthResponse } from './models';

@Injectable()
export class HealthService {
  liveness(): IHealthResponse {
    return { status: 'OK', version: '0.0.1' };
  }
}
