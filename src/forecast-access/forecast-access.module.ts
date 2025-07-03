import { Module } from '@nestjs/common';
import { ForecastAccessService } from './forecast-access.service';
import { ForecastAccessController } from './forecast-access.controller';
import { NatsModule } from 'src/transports/nats.module';
import { SqlForecastRepository } from 'src/storage/sql-forecast.repository';
import { FORECAST_REPOSITORY } from 'src/storage/interface/forecast.repository.interface';
import { CacheModule } from '@nestjs/cache-manager';
import { CACHE_REPOSITORY } from 'src/storage/interface/cache.repository.interface';
import { RedisCacheRepository } from 'src/storage/redis-cache.repository';
import { envs } from 'src/config';

@Module({
  controllers: [ForecastAccessController],
  providers: [
    ForecastAccessService,
    {
      provide: FORECAST_REPOSITORY,
      useClass: SqlForecastRepository,
    },
    {
      provide: CACHE_REPOSITORY,
      useClass: RedisCacheRepository,
    },
  ],
  imports: [
    NatsModule,
    CacheModule.register({
      store: () =>
        new (require('keyv'))({
          store: new (require('keyv-redis'))(envs.cacheServer),
        }),
    }),
  ],
})
export class ForecastAccessModule {}
