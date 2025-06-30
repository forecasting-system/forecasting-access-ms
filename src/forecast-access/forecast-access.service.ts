import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';

@Injectable()
export class ForecastAccessService {
  private readonly logger = new Logger('Forecast access service');

  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {
    //   super();
  }

  //   async onModuleInit() {
  //     await this.$connect();
  //     this.logger.log('Database connected');
  //   }

  async getForecast() {
    return 'Forecast';
  }

  async saveForecast(forecast: any) {
    // TODO: save forecast
    console.log('Forecast to be saved');
    this.client.emit('internal.forecast.updated', forecast);
  }
}
