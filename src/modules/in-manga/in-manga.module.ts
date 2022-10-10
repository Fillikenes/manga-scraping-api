import { Module } from '@nestjs/common';
import { InMangaService } from './in-manga.service';
import { InMangaController } from './in-manga.controller';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';

@Module({
  providers: [InMangaService, HttpService, HtmlParserService],
  controllers: [InMangaController],
})
export class InMangaModule {}
