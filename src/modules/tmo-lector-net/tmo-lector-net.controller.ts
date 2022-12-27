import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseBoolPipe,
  Query,
} from '@nestjs/common';
import { TmoLectorNetParamDto, TmoLectorNetSearchParamDto } from './dto';
import { TmoLectorNetService } from './tmo-lector-net.service';

@Controller('tmo-lector-net')
export class TmoLectorNetController {
  constructor(private readonly tmoLectorNetService: TmoLectorNetService) {}

  @Get('/')
  public async getManga(@Query() params: TmoLectorNetParamDto) {
    return this.tmoLectorNetService.getPage(params.url);
  }

  @Get('search/:value')
  public async searchManga(
    @Param() params: TmoLectorNetSearchParamDto,
    @Query('getAll', new DefaultValuePipe(false), ParseBoolPipe) getAll = false,
  ): Promise<any> {
    return this.tmoLectorNetService.search(params.value, getAll);
  }
}
