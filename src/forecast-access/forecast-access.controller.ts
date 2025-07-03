import { Controller, Inject, Logger } from '@nestjs/common';
import { ForecastAccessService } from './forecast-access.service';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { ForecastDto } from 'src/dto/forecast.dto';
import { Forecast } from 'src/model/forecast.model';
import { NATS_SERVICE } from 'src/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller()
export class ForecastAccessController {
  constructor(
    private readonly forecastAccessService: ForecastAccessService,
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private readonly logger = new Logger('Forecast access service');

  @MessagePattern('getForecast')
  async getForecast() {
    // TODO: avoid coupling and dirty code
    const cachedForecast = await this.cacheManager.get('forecast');
    if (cachedForecast) {
      const cachedForecastJson = JSON.parse(cachedForecast as string);
      const forecast = Forecast.fromJSON(cachedForecastJson);

      this.logger.log('Forecast from cache');
      return forecast;
    }

    this.logger.log('Forecast from database');
    const forecast = await this.forecastAccessService.getForecast();
    await this.cacheManager.set('forecast', JSON.stringify(forecast));

    return forecast;
  }

  @EventPattern('internal.forecast.generated')
  async handleForecastGenerated(
    @Payload() forecastDto: ForecastDto,
  ): Promise<void> {
    const { points, model_version, id, created_at } = forecastDto;
    const forecast = new Forecast(points, model_version, id, created_at);
    await this.forecastAccessService.saveForecast(forecast);
    // TODO: avoid coupling and dirty code
    await this.cacheManager.set('forecast', JSON.stringify(forecast));
    this.logger.log('Forecast updated in cache');
    this.client.emit('internal.forecast.updated', forecast);
    this.logger.log('Forecast emitted');
  }
}
