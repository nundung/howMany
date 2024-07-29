import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StaticModule } from './static/static.module';
import { ScraperModule } from './scraper/scraper.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MbtiModule } from './mbti/mbti.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    StaticModule,
    ScraperModule,
    MbtiModule,
  ],
})
export class AppModule {}
