import { Injectable } from '@nestjs/common';
import got from 'got';
import { IGetParams } from './models';

@Injectable()
export class HttpService {
  public async get({ url, headers, query, isJson }: IGetParams) {
    const options = {
      ...(headers && { headers }),
      ...(query && { searchParams: { query } }),
    };

    const request = got.get(url, options);
    return isJson ? request.json() : request;
  }
}
