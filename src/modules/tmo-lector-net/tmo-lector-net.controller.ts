import { Controller, Get, Param, Query } from '@nestjs/common';
import { TmoLectorNetService } from './tmo-lector-net.service';
import { TmoLectorNetParamDto, TmoLectorNetSearchParamDto } from './dtos';
import { IOutboundChapter, IOutboundSearchResponse } from '../../interfaces';

@Controller('tmo-lector-net')
export class TmoLectorNetController {
  constructor(private readonly tmoLectorNetService: TmoLectorNetService) {}

  @Get('/')
  public async get(
    @Query() params: TmoLectorNetParamDto,
  ): Promise<IOutboundChapter[]> {
    return this.tmoLectorNetService.get({ url: params.url });
  }

  @Get('search/:value')
  public async search(
    @Param() params: TmoLectorNetSearchParamDto,
  ): Promise<IOutboundSearchResponse[]> {
    return this.tmoLectorNetService.search({ value: params.value });
  }
}
