import { Injectable } from '@nestjs/common';
import got from 'got';
import { IGetParams, IPostParams } from './models';

@Injectable()
export class HttpService {
  public async get({ url, headers, query, isJson }: IGetParams): Promise<any> {
    const options = {
      ...(headers && { headers }),
      ...(query && { searchParams: query }),
    };
    const request = got.get(url, options);
    return isJson ? request.json() : request;
  }

  public async post({ url, query, isJson }: IPostParams): Promise<any> {
    let options = {};
    if (query) {
      const headers = query.headers;
      delete query.headers;
      options = { json: query, headers };
    }

    const request = got.post(url, options);
    return isJson ? request.json() : request;
  }
}
