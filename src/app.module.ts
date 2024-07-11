import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StaticModule } from './static/static.module';
import { ScraperModule } from './scraper/scraper.module';

@Module({ imports: [HttpModule, StaticModule, ScraperModule] })
export class AppModule {}
