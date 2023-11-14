import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async get(key: string): Promise<string> {
    return await this.cacheManager.get(key);
  }

  async set(key: string, value: any): Promise<void> {
    return await this.cacheManager.set(key, value);
  }

  async del(key: string): Promise<void> {
    return this.cacheManager.del(key);
  }
}
