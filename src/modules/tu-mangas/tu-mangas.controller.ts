import { Controller, Get, Param, Query } from '@nestjs/common';
import { TuMangasGetListDto } from './dtos';
import { TuMangasService } from './tu-mangas.service';
import { TuMangasSearchDto } from './dtos/tu-mangas-query.dto';
import { IOutboundChapter, IOutboundSearchResponse } from '../../interfaces';

@Controller('tu-mangas')
export class TuMangasController {
  constructor(private readonly tumangasService: TuMangasService) {}

  @Get('/')
  async get(@Query() query: TuMangasGetListDto): Promise<IOutboundChapter[]> {
    return this.tumangasService.get({ url: query.url });
  }

  @Get('/search/:value')
  async search(
    @Param() params: TuMangasSearchDto,
  ): Promise<IOutboundSearchResponse[]> {
    return this.tumangasService.search({ value: params.value });
  }
}
