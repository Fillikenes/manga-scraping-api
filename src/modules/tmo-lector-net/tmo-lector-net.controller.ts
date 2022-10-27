import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseBoolPipe,
  Query,
} from '@nestjs/common';
import { TmoLectorNetService } from './tmo-lector-net.service';

@Controller('tmo-lector-net')
export class TmoLectorNetController {
  constructor(private readonly tmoLectorNetService: TmoLectorNetService) {}

  @Get('/')
  public async getManga(): Promise<any> {
    const url = 'https://tmolector.net/manga/one-punch-man';
    return this.tmoLectorNetService.getPage(url);
  }

  @Get('search/:manga')
  public async searchManga(
    @Param() params: any,
    @Query('getAll', new DefaultValuePipe(false), ParseBoolPipe) getAll = false,
  ): Promise<any> {
    return this.tmoLectorNetService.search(params.manga, getAll);
  }
}
