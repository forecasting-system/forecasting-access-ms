import { Inject, Injectable, Logger } from '@nestjs/common';
import { CacheRepository } from './interface/cache.repository.interface';
import { Forecast } from 'src/model/forecast.model';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheRepository implements CacheRepository {
  private readonly logger = new Logger('Redis Cache Repository');

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setForecastCache(key: string, forecast: string): Promise<void> {
    await this.cacheManager.set(key, forecast);
  }

  async getForecastCache(
    key: string = 'forecast',
  ): Promise<string | null | undefined> {
    return await this.cacheManager.get(key);
  }
}
