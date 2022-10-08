import { Controller, Get, Query } from '@nestjs/common';
import { AnzMangaService } from './anz-manga.service';
import { AnzMangaQueryDto } from './dto';

@Controller('anz-manga')
export class AnzMangaController {
  constructor(private readonly anzMangaService: AnzMangaService) {}

  @Get('/')
  public async getMangaInformation(
    @Query() anzMangaQueryDto: AnzMangaQueryDto,
  ): Promise<any> {
    return await this.anzMangaService.getPage(anzMangaQueryDto.url);
  }
}
