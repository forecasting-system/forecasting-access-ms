import { Forecast } from 'src/model/forecast.model';

export const FORECAST_REPOSITORY = 'ForecastRepository';

export interface ForecastRepository {
  saveForecast(forecast: Forecast): Promise<void>;
  getForecast(): Promise<Forecast>;
}
