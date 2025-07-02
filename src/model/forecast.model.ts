export class ForecastPoint {
  constructor(
    public readonly date: Date,
    public readonly y: number,
  ) {}
}

export class Forecast {
  constructor(
    public readonly points: ForecastPoint[],
    public readonly model_version: string,
    public readonly id: string,
    public readonly created_at: Date,
  ) {}
}
