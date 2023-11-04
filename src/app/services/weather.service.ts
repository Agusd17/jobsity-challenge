import { IApiWeatherResponse } from './../interfaces/api-response';
import { Observable } from 'rxjs';
import { apiWeather } from './../constants/api-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private _apiWeather = apiWeather;

  constructor(private _http: HttpClient) {}

  getWeatherInformation(city: string): Observable<IApiWeatherResponse> {
    return this._http.get<IApiWeatherResponse>(
      `${this._apiWeather.url}${city}?key=${this._apiWeather.apiKey}`
    );
  }
}
