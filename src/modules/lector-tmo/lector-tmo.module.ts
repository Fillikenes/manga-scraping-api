import { Module } from '@nestjs/common';
import { LectorTmoController } from './lector-tmo.controller';
import { LectorTmoService } from './lector-tmo.service';
import { PuppeteerService } from '../../services/puppeteer/puppeteer.service';

@Module({
  controllers: [LectorTmoController],
  providers: [LectorTmoService, PuppeteerService],
})
export class LectorTmoModule {}
