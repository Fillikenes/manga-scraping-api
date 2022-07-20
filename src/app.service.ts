import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  info(): string {
    return 'webscraping-api';
  }
}
