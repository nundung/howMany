import { Cache } from 'cache-manager';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { cacheService } from 'src/common/cache/cache.service';

@Injectable()
export class StaticService {
  private readonly logger = new Logger(StaticService.name);

  constructor(private readonly cachService: cacheService) {}

  async getMostPlayedCharts() {
    try {
      // 캐시에서 데이터 가져오기
      const cachedCharts = await this.cachService.get('mostPlayedCharts');
      this.logger.debug('Returning cached most played charts data');
      return JSON.parse(cachedCharts);
    } catch (error) {
      console.error('Steam API 요청 실패:', error);
      throw error;
    }
  }

  async getTopSellerCharts(region: string) {
    try {
      // 캐시에서 데이터 가져오기
      const cachedCharts = await this.cachService.get('topSellerCharts');
      this.logger.debug('Returning cached most played charts data');
      return cachedCharts;
    } catch (error) {
      console.error('Steam API 요청 실패:', error);
      throw error;
    }
  }
}
