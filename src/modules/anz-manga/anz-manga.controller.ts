import { Controller, Get, Param, Query } from '@nestjs/common';
import { AnzMangaService } from './anz-manga.service';
import { AnzMangaQueryDto, AnzMangaSearchDto } from './dto';

@Controller('anz-manga')
export class AnzMangaController {
  constructor(private readonly anzMangaService: AnzMangaService) {}
  @Get('/')
  public async getManga(
    @Query() anzMangaQueryDto: AnzMangaQueryDto,
  ): Promise<any> {
    return await this.anzMangaService.getPage(anzMangaQueryDto.url);
  }

  @Get('search/:value')
  public async searchManga(@Param() params: AnzMangaSearchDto) {
    return await this.anzMangaService.search(params.value);
  }
}
