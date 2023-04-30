import { Controller, Get, Param, Query } from '@nestjs/common';
import { InMangaService } from './in-manga.service';
import { InMangaGetDto, InMangaSearchDto } from './dtos';
import { IOutboundChapter, IOutboundSearchResponse } from '../../interfaces';

@Controller('in-manga')
export class InMangaController {
  constructor(private readonly inMangaService: InMangaService) {}

  @Get('/')
  public async get(
    @Query() params: InMangaGetDto,
  ): Promise<IOutboundChapter[]> {
    return this.inMangaService.get({ url: params.url });
  }

  @Get('search/:value')
  public async search(
    @Param() params: InMangaSearchDto,
  ): Promise<IOutboundSearchResponse[]> {
    return this.inMangaService.search({ value: params.value });
  }
}
