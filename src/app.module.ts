import { Module } from '@nestjs/common';
import { ForecastAccessModule } from './forecast-access/forecast-access.module';

@Module({
  imports: [ForecastAccessModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
