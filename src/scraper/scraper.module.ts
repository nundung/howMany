import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheMoudle } from 'src/common/cache/cache.module';

@Module({
  imports: [HttpModule, CacheMoudle],
  controllers: [ScraperController],
  providers: [ScraperService],
})
export class ScraperModule {}
