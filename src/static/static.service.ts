import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map } from 'rxjs';
import { cacheService } from 'src/cache/cache.service';
import * as config from 'config';

@Injectable()
export class StaticService {
  private readonly logger = new Logger(StaticService.name);

  constructor(
    private readonly cachService: cacheService,
    private readonly httpService: HttpService,
  ) {}

  async getMostPlayedCharts(): Promise<{ cachedCharts: string }> {
    try {
      //캐시에서 데이터 가져오기
      const cachedCharts = await this.cachService.get('mostPlayedCharts');
      this.logger.debug('Returning cached most played charts data');

      return JSON.parse(cachedCharts);
    } catch (error) {
      console.error('Steam API 요청 실패:', error);
      throw error;
    }
  }

  async getTopSellerCharts(region: string): Promise<{ cachedCharts: string }> {
    try {
      //캐시에서 데이터 가져오기
      const cachedCharts = await this.cachService.get(
        `topSellerCharts:${region}`,
      );
      this.logger.debug(
        `Returning cached top seller charts for ${region} data`,
      );

      return JSON.parse(cachedCharts);
    } catch (error) {
      console.error('Steam API 요청 실패:', error);
      throw error;
    }
  }

  async getTopPlaytimeUser(
    regionOrCountryCode?: string,
  ): Promise<{ Charts: string }> {
    try {
      let url = `https://steamladder.com/api/v1/ladder/playtime`;
      if (regionOrCountryCode) {
        url += `/${regionOrCountryCode}`;
      }
      const headers = {
        Authorization: `Token ${config.api.steamLadder}`,
      };

      const response = await firstValueFrom(
        this.httpService
          .get(url, { headers }) // URL과 헤더 설정
          .pipe(map((response: AxiosResponse) => response.data)),
      );

      return response;
    } catch (error) {
      console.error('Steam API 요청 실패:', error);
      throw error;
    }
  }

  async getTopGamesOwner(regionOrCountryCode?: string): Promise<any> {
    try {
      let url = `https://steamladder.com/api/v1/ladder/games`;
      if (regionOrCountryCode) {
        url += `/${regionOrCountryCode}`;
      }
      const headers = {
        Authorization: `Token ${config.api.steamLadder}`,
      };

      const response = await firstValueFrom(
        this.httpService
          .get(url, { headers }) // URL과 헤더 설정
          .pipe(map((response: AxiosResponse) => response.data)),
      );

      return response;
    } catch (error) {
      this.logger.error('Steam API 요청 실패:', error.message);
      throw error;
    }
  }
}
// https://steamladder.com/api/v1/ladder/games/asia/2d0332d934fcc5230595d31034570fc56e3ab0fe
