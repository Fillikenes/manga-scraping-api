import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseBoolPipe,
  Query,
} from '@nestjs/common';
import {
  IBaseController,
  IOutboundChapter,
  IOutboundSearchResponse,
} from '../../interfaces';
import { TmoLectorNetService } from './tmo-lector-net.service';
import { TmoLectorNetParamDto, TmoLectorNetSearchParamDto } from './dtos';

@Controller('tmo-lector-net')
export class TmoLectorNetController implements IBaseController {
  constructor(private readonly tmoLectorNetService: TmoLectorNetService) {}

  @Get('/')
  public async get(
    @Query() params: TmoLectorNetParamDto,
  ): Promise<IOutboundChapter[]> {
    return this.tmoLectorNetService.getPage(params.url);
  }

  @Get('search/:value')
  public async search(
    @Param() params: TmoLectorNetSearchParamDto,
    @Query('getAll', new DefaultValuePipe(false), ParseBoolPipe) getAll = false,
  ): Promise<IOutboundSearchResponse[]> {
    return this.tmoLectorNetService.search(params.value, getAll);
  }
}
