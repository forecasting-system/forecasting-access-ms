import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class Point {
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNumber()
  y: number;
}

export class ForecastDto {
  @IsString()
  id: string;

  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @IsArray()
  @Type(() => Point)
  points: Point[];

  @IsString()
  model_version: string;
}
