import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { AnzMangaService } from './anz-manga.service';

@Controller('anz-manga')
export class AnzMangaController {
    constructor(private readonly anzMangaService: AnzMangaService){}

    @Get('/')
    public async getMangaInformation(): Promise<any>{
        const page = 'https://www.anzmangashd.com/manga/kengan-omega';
        return await this.anzMangaService.getPage(page);
    }

}
