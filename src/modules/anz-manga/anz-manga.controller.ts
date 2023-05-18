import { Controller, Get, Param, Query } from '@nestjs/common';
import { AnzMangaService } from './anz-manga.service';
import { AnzMangaQueryDto, AnzMangaSearchDto } from './dtos';
import { IOutboundChapter, IOutboundSearchResponse } from '../../interfaces';

@Controller('anz-manga')
export class AnzMangaController {
  constructor(private readonly anzMangaService: AnzMangaService) {}

  @Get('/')
  public async get(
    @Query() params: AnzMangaQueryDto,
  ): Promise<IOutboundChapter[]> {
    return this.anzMangaService.get({ url: params.url });
  }

  @Get('search/:value')
  public async search(
    @Param() params: AnzMangaSearchDto,
  ): Promise<IOutboundSearchResponse[]> {
    return this.anzMangaService.search({ value: params.value });
  }
}
