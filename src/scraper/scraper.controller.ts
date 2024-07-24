import { Controller, Get, Query } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { query } from 'express';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get('mostplayed')
  async scrapMostPlayed() {
    const charts = await this.scraperService.scrapMostPlayedCharts();
    return charts;
  }

  @Get('topseller')
  async scrapTopSeller(@Query('region') region: string) {
    const charts = await this.scraperService.scrapTopSellerCharts(region);
    return charts;
  }
}
