import { Controller, Get } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get('charts')
  async getSteamCharts() {
    const charts = await this.scraperService.scrapeMostPlayedCharts();
    return charts;
  }
}
