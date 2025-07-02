import { Inject, Injectable, Logger } from '@nestjs/common';
import { Forecast } from 'src/model/forecast.model';
import {
  FORECAST_REPOSITORY,
  ForecastRepository,
} from 'src/storage/interface/forecast.repository.interface';

@Injectable()
export class ForecastAccessService {
  constructor(
    @Inject(FORECAST_REPOSITORY)
    private readonly repository: ForecastRepository,
  ) {}

  async getForecast() {
    const forecast = await this.repository.getForecast();
    return forecast;
  }

  async saveForecast(forecast: Forecast) {
    await this.repository.saveForecast(forecast);
  }
}
