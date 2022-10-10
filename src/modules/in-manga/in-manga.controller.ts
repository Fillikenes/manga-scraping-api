import { Controller, Get, Param } from '@nestjs/common';
import { InMangaService } from './in-manga.service';
import { InMangaParamDto } from './dto';

@Controller('in-manga')
export class InMangaController {
  constructor(private readonly inMangaService: InMangaService) {}

  @Get('/:manga')
  public async getManga(@Param() query: InMangaParamDto): Promise<any> {
    return this.inMangaService.getPage(query.manga);
  }

  @Get('search/:manga')
  public async searchManga(@Param() params: InMangaParamDto): Promise<any> {
    return this.inMangaService.search(params.manga);
  }
}
