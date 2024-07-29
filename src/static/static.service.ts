import { Injectable, Logger } from '@nestjs/common';
import { cacheService } from 'src/common/cache/cache.service';

@Injectable()
export class StaticService {
  private readonly logger = new Logger(StaticService.name);

  constructor(private readonly cachService: cacheService) {}

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
}
