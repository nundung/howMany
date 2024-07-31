import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StaticModule } from './static/static.module';
import { ScraperModule } from './scraper/scraper.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MbtiModule } from './mbti/mbti.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    HttpModule,
    StaticModule,
    ScraperModule,
    MbtiModule,
  ],
})
export class AppModule {}
