import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { StaticService } from './static.service';

@Controller('static')
export class StaticContoller {
  constructor(private readonly staticService: StaticService) {}

  //당일최다접속게임
  @Get('mostplayed')
  async scrapMostPlayed() {
    const charts = await this.staticService.getMostPlayedCharts();
    return charts;
  }

  //전주의 topseller게임
  @Get('topseller')
  async scrapTopSeller(@Query('region') region: string) {
    const charts = await this.staticService.getTopSellerCharts(region);
    return charts;
  }
}
