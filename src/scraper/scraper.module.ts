import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { CacheConfigMoudle } from 'src/cache/cache.module';

@Module({
  imports: [HttpModule, CacheConfigMoudle],
  controllers: [ScraperController],
  providers: [ScraperService],
})
export class ScraperModule {}
