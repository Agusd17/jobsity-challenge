import { IApiWeatherResponse } from './../interfaces/api-response';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiWeather } from './../constants/api-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private _apiWeather = apiWeather;

  constructor(private _http: HttpClient) {}

  public getWeatherInformation(
    city: string,
    dateString: string
  ): Observable<IApiWeatherResponse | null> {
    return this._http
      .get<IApiWeatherResponse>(
        `${this._apiWeather.url}${city}/${dateString}?key=${this._apiWeather.apiKey}`
      )
      .pipe(
        catchError((error: any) => {
          if (error.status === 400) {
            // Handle 400 Bad Request error
            // You can return a different observable, throw an error, or handle it as needed
            return of(null);
          }
          // Rethrow the error for other types of errors
          return throwError(error);
        })
      );
  }
}
