import { Controller, Get } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get('mostplayed')
  async getCharts() {
    const charts = await this.scraperService.scrapMostPlayedCharts();
    return charts;
  }
}
