import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { cacheService } from './cache.service';

@Module({
  imports: [
    CacheModule.register({
      store: 'memory', // 기본 메모리 캐시 스토어
      max: 1000, // 최대 캐시 항목 수
      ttl: 600, // 기본 TTL (초)
    }),
  ],
  providers: [cacheService],
  exports: [cacheService],
})
export class CacheMoudle {}
