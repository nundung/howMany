import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class cacheService {
  private readonly memoryData: Record<string, string> = {};

  constructor() {}

  public async get(key: string): Promise<string | null> {
    return this.memoryData[key] || null;
    //return this.cacheManager.get(key);
  }

  public async set(key: string, value: string, ttl: number): Promise<void> {
    this.memoryData[key] = value;
    this.deleteValueAfter(key, ttl);
    //return this.cacheManager.set(key, value, ttl);
  }

  private deleteValueAfter(key: string, ttl: number) {
    setTimeout(() => {
      delete this.memoryData[key];
    }, ttl * 1000);
  }
}
