import { Module } from '@nestjs/common';
import { LectorMangaController } from './lector-manga.controller';
import { LectorMangaService } from './lector-manga.service';
import { HttpService } from 'src/services/http/http.service';
import { HtmlParserService } from 'src/services/html-parser/html-parser.service';

@Module({
  controllers: [LectorMangaController],
  providers: [LectorMangaService, HttpService, HtmlParserService],
})
export class LectorMangaModule {}
