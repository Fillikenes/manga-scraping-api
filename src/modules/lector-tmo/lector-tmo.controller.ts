import { Controller, Get } from '@nestjs/common';
import { LectorTmoService } from './lector-tmo.service';

@Controller('lector-tmo')
export class LectorTmoController {
  constructor(private readonly lectorTmoService: LectorTmoService) {}
  @Get()
  async getData(): Promise<any> {
    const url = 'https://lectortmo.com/library/manga/9276/one-punch-man';
    return await this.lectorTmoService.getImagesChapter(
      'https://lectortmo.com/library/manga/63575/boku-wa-isekai-de-fuyo-mahou-to-shoukan-mahou-wo-tenbin-ni-kakeru',
    );
  }
}
