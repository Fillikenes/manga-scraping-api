import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { HealthModule } from './modules/health/health.module';
import { HttpService } from './services/http/http.service';
import { HtmlParserService } from './services/html-parser/html-parser.service';
import { AnzMangaModule } from './modules/anz-manga/anz-manga.module';
import { InMangaModule } from './modules/in-manga/in-manga.module';
import { TmoLectorNetModule } from './modules/tmo-lector-net/tmo-lector-net.module';
import { TuMangasModule } from './modules/tu-mangas/tu-mangas.module';
import { LectorMangaModule } from './modules/lector-manga/lector-manga.module';
@Module({
  imports: [
    ConfigModule,
    HealthModule,
    AnzMangaModule,
    InMangaModule,
    TmoLectorNetModule,
    TuMangasModule,
    LectorMangaModule,
  ],
  controllers: [AppController],
  providers: [AppService, HttpService, HtmlParserService],
})
export class AppModule {
  public config = this.configService.config;

  constructor(private readonly configService: ConfigService) {}
}
