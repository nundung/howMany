import { Controller, Get } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get('mostplayed')
  async scrapMostPlayed() {
    const charts = await this.scraperService.scrapMostPlayedCharts();
    return charts;
  }

  @Get('topseller')
  async scrapTopSeller() {
    const charts = await this.scraperService.scrapTopSellerCharts();
    return charts;
  }
}
