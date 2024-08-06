import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    CacheModule.register({
      store: 'memory', //기본 메모리 캐시 스토어
      max: 1000, //최대 캐시 항목 수
      ttl: 900, //기본 TTL (초)
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheConfigMoudle {}
