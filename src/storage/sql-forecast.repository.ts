import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

import { ForecastRepository } from './interface/forecast.repository.interface';
import { Forecast, ForecastPoint } from 'src/model/forecast.model';

@Injectable()
export class SqlForecastRepository
  extends PrismaClient
  implements ForecastRepository, OnModuleInit
{
  private readonly logger = new Logger('Forecast access service');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  async saveForecast(forecast: Forecast) {
    await this.forecast.create({
      data: {
        id: forecast.id,
        model_version: forecast.model_version,
        created_at: forecast.created_at,
        points: {
          create: forecast.points.map((point) => ({
            date: point.date,
            y: point.y,
          })),
        },
      },
    });
  }

  async getForecast() {
    const forecastData = await this.forecast.findFirst({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        points: true,
      },
    });

    if (!forecastData) {
      throw new Error('Forecast not found');
    }

    const { points, model_version, id, created_at } = forecastData;

    const forecastPoints = points.map(
      (point) => new ForecastPoint(point.date, point.y),
    );

    return new Forecast(forecastPoints, model_version, id, created_at);
  }
}
