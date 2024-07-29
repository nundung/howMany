import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StaticModule } from './static/static.module';
import { ScraperModule } from './scraper/scraper.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MbtiModule } from './mbti/mbti.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      store: 'memory', // 기본 메모리 캐시 스토어
      max: 1000, // 최대 캐시 항목 수
      ttl: 600, // 기본 TTL (초)
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
