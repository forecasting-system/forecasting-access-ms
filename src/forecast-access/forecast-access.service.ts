import { Inject, Injectable, Logger } from '@nestjs/common';
import { Forecast } from 'src/model/forecast.model';
import {
  CACHE_REPOSITORY,
  CacheRepository,
} from 'src/storage/interface/cache.repository.interface';
import {
  FORECAST_REPOSITORY,
  ForecastRepository,
} from 'src/storage/interface/forecast.repository.interface';

@Injectable()
export class ForecastAccessService {
  constructor(
    @Inject(FORECAST_REPOSITORY)
    private readonly repository: ForecastRepository,
    @Inject(CACHE_REPOSITORY)
    private readonly cacheRepository: CacheRepository,
  ) {}

  private readonly logger = new Logger('Forecast access service');

  async getForecast() {
    const cachedForecast =
      await this.cacheRepository.getForecastCache('forecast');
    if (cachedForecast) {
      const cachedForecastJson = JSON.parse(cachedForecast as string);
      const forecast = Forecast.fromJSON(cachedForecastJson);

      this.logger.log('Forecast from cache');
      return forecast;
    }

    const forecast = await this.repository.getForecast();
    await this.cacheRepository.setForecastCache(
      'forecast',
      JSON.stringify(forecast),
    );

    this.logger.log('Forecast from database');
    return forecast;
  }

  async saveForecast(forecast: Forecast) {
    await this.repository.saveForecast(forecast);
    await this.cacheRepository.setForecastCache(
      'forecast',
      JSON.stringify(forecast),
    );
    this.logger.log('Forecast updated in cache');
  }
}
