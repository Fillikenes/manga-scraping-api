import { Injectable } from '@nestjs/common';
import got from 'got';

@Injectable()
export class HttpService {
  public async get(url: string, headers?: any, query?: any) {
    const options = {
      ...(headers && { headers }),
      ...(query && { searchParams: { query } }),
    };

    return got.get(url, options);
  }
}
