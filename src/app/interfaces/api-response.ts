export interface IApiWeatherResponse {
  resolvedAddress: string;
  days: IWeatherDay[];
}

export interface IWeatherDay {
  datetime: string;
  description: string;
  icon: string;
}
