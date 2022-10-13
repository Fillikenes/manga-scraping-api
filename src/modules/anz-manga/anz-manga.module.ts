import { Module } from '@nestjs/common';
import { AnzMangaService } from './anz-manga.service';
import { AnzMangaController } from './anz-manga.controller';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';

@Module({
  providers: [AnzMangaService, HttpService, HtmlParserService],
  controllers: [AnzMangaController],
})
export class AnzMangaModule {}
