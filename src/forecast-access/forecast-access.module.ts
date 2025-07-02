import { Module } from '@nestjs/common';
import { ForecastAccessService } from './forecast-access.service';
import { ForecastAccessController } from './forecast-access.controller';
import { NatsModule } from 'src/transports/nats.module';
import { SqlForecastRepository } from 'src/storage/sql-forecast.repository';
import { FORECAST_REPOSITORY } from 'src/storage/interface/forecast.repository.interface';

@Module({
  controllers: [ForecastAccessController],
  providers: [
    ForecastAccessService,
    {
      provide: FORECAST_REPOSITORY,
      useClass: SqlForecastRepository,
    },
  ],
  imports: [NatsModule],
})
export class ForecastAccessModule {}
