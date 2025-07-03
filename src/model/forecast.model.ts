interface ForecastPointDTO {
  date: string;
  y: number;
}

interface ForecastDTO {
  points: ForecastPointDTO[];
  model_version: string;
  id: string;
  created_at: string;
}

export class ForecastPoint {
  constructor(
    public readonly date: Date,
    public readonly y: number,
  ) {}

  static fromJSON(obj: any): ForecastPoint {
    return new ForecastPoint(new Date(obj.date), obj.y);
  }
}

export class Forecast {
  constructor(
    public readonly points: ForecastPoint[],
    public readonly model_version: string,
    public readonly id: string,
    public readonly created_at: Date,
  ) {}

  static fromJSON(obj: ForecastDTO): Forecast {
    const points = (obj.points || []).map(ForecastPoint.fromJSON);
    return new Forecast(
      points,
      obj.model_version,
      obj.id,
      new Date(obj.created_at),
    );
  }
}
