import { StaticService } from './static.service';
import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('api/v1/static')
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
    return await this.staticService.getMostPlayedCharts();
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
    return await this.staticService.getTopSellerCharts(region);
  }

  //topPlayTime사용자
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
        type: { type: 'string', example: 'G' },
        type_url: { type: 'string', example: 'games' },
        country_code: { type: 'string', example: 'KR' },
        ladder: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              pos: { type: 'number', example: 0 },
              steam_user: {
                type: 'object',
                properties: {
                  steam_name: { type: 'string', example: 'an0rose' },
                  steam_id: { type: 'string', example: '76561198001221571' },
                  steamladder_url: {
                    type: 'string',
                    example:
                      'https://steamladder.com/profile/76561198001221571/',
                  },
                  steam_join_date: {
                    type: 'string',
                    format: 'date-time',
                    example: '2008-09-16T02:52:45',
                  },
                  steam_country_code: { type: 'string', example: 'KR' },
                  steam_avatar_src: {
                    type: 'string',
                    example:
                      'https://avatars.steamstatic.com/dc59a43c5e23c60b83c22b9841ad09a36ac5a4f8_full.jpg',
                  },
                },
              },
              steam_stats: {
                type: 'object',
                properties: {
                  level: { type: 'number', example: 458 },
                  xp: { type: 'number', example: 1076164 },
                  badges: { type: 'object' }, // Define properties if known
                  games: {
                    type: 'object',
                    properties: {
                      total_games: { type: 'number', example: 24224 },
                    },
                  },
                  bans: { type: 'object' }, // Define properties if known
                },
              },
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
  @Get('top-playtime-user')
  async getTopPlaytimeUser(
    @Query('regionOrCountryCode') regionOrCountryCode: string,
  ) {
    return await this.staticService.getTopPlaytimeUser(regionOrCountryCode);
  }

  @Get('top-games-owner')
  async getTopGamesOwner(
    @Query('regionOrCountryCode') regionOrCountryCode: string,
  ) {
    return await this.staticService.getTopGamesOwner(regionOrCountryCode);
  }
}
