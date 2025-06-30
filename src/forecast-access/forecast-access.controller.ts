import { Controller } from '@nestjs/common';
import { ForecastAccessService } from './forecast-access.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ForecastAccessController {
  constructor(private readonly forecastAccessService: ForecastAccessService) {}

  @MessagePattern({ cmd: 'getForecast' })
  getForecast() {
    return this.forecastAccessService.getForecast();
  }

  @EventPattern('internal.forecast.generated')
  // TODO: data DTO
  handleForecastGenerated(@Payload() data: any): Promise<void> {
    console.log(`Forecast received ${data}`);
    return this.forecastAccessService.saveForecast(data);
  }
}
