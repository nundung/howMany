import { StaticService } from './static.service';
import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('static')
@ApiTags('static API')
export class StaticContoller {
  constructor(private readonly staticService: StaticService) {}

  //당일최다접속게임
  @ApiOperation({
    summary: 'getMostPlayed API',
    description: 'MostPlayed 차트를 불러오는 API',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiOkResponse({
    description: 'OK',
    schema: {
      type: 'object',
      properties: {
        charts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rank: { type: 'number', example: 1 },
              name: { type: 'string', example: 'Counter-Strike 2' },
              price: { type: 'string', example: 'Free To Play' },
              currentPlayers: { type: 'string', example: '867,766' },
              peakPlayers: { type: 'string', example: '1,313,419' },
            },
          },
        },
      },
    },
  })
  @Get('most-played')
  async scrapMostPlayed() {
    const charts = await this.staticService.getMostPlayedCharts();
    return charts;
  }

  //topseller게임
  @ApiOperation({
    summary: 'scrapTopSeller API',
    description: 'TopSeller 차트를 불러오는 api',
  })
  @ApiBadRequestResponse({ description: 'Invalid request parameters' })
  @ApiOkResponse({
    description: 'OK',
    schema: {
      type: 'object',
      properties: {
        charts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rank: { type: 'number', example: 9 },
              name: { type: 'string', example: 'Dead by Daylight' },
              price: { type: 'string', example: '-60%\n₩ 21,500\n₩ 8,600' },
              change: { type: 'string', example: '▲ 17' },
              weeks: { type: 'string', example: '376' },
            },
          },
        },
      },
    },
  })
  @ApiQuery({
    name: 'region',
    description: 'TopSeller 차트를 가져올 지역 (예: KR, US, JP, CN)',
    required: true,
    type: 'string',
  })
  @Get('top-seller')
  async scrapTopSeller(@Query('region') region: string) {
    const charts = await this.staticService.getTopSellerCharts(region);
    return charts;
  }
}
