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

@Controller()
export class ForecastAccessController {
  constructor(
    private readonly forecastAccessService: ForecastAccessService,
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  private readonly logger = new Logger('Forecast access service');

  @MessagePattern('getForecast')
  async getForecast() {
    const forecast = await this.forecastAccessService.getForecast();

    return forecast;
  }

  @EventPattern('internal.forecast.generated')
  async handleForecastGenerated(
    @Payload() forecastDto: ForecastDto,
  ): Promise<void> {
    const { points, model_version, id, created_at } = forecastDto;
    const forecast = new Forecast(points, model_version, id, created_at);
    await this.forecastAccessService.saveForecast(forecast);

    this.client.emit('internal.forecast.updated', forecast);
    this.logger.log('Forecast updated message emitted');
  }
}
