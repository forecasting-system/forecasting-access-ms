import { Forecast } from 'src/model/forecast.model';

export const CACHE_REPOSITORY = 'CacheRepository';

export interface CacheRepository {
  getForecastCache(key: string): Promise<string | null | undefined>;
  setForecastCache(key: string, forecast: string): Promise<void>;
}
