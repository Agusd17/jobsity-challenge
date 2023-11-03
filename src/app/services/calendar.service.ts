import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Reminder, Month } from '../interfaces';
import { Months, mockupData } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  public reminders: Reminder[] = [];

  private readonly _mockupDataURL = mockupData;

  constructor(private _http: HttpClient) {}

  public getCurrentMont(month: string): Observable<Month> {
    // API call...
    // Backend returns the desired Month
    // we fake all that with the method below
    //this._generateMonth(2023, month, 3);
    return this._getFakeMonth();
  }

  public create(data: Reminder): Reminder {
    return data;
  }

  public edit(data: Reminder): Reminder {
    return data;
  }

  public list(date: Date): Observable<Reminder[]> {
    console.log(date);
    return of(this.reminders);
  }

  public delete(reminderId: string): boolean {
    console.log(reminderId);
    return true;
  }

  private _generateMonth(
    year: number,
    month: string,
    numberOfDaysBefore: number
  ): any {
    const monthsInYear = Months;

    const monthIndex = monthsInYear.findIndex(
      (m) => m.toLowerCase() === month.toLowerCase()
    );

    if (monthIndex === -1) {
      console.error('Invalid month');
      return [];
    }

    const lastDayOfRequestedMonth = new Date(year, monthIndex, 0).getDate();
    const days = [];

    for (
      let i = lastDayOfRequestedMonth - numberOfDaysBefore + 1;
      i <= lastDayOfRequestedMonth;
      i++
    ) {
      const date = new Date(year, monthIndex - 1, i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const day = `${dayName} ${i}, ${monthsInYear[monthIndex - 1]}`;
      days.push(day);
    }

    //return days;
    console.log(days);
  }

  private _getFakeMonth(): Observable<Month> {
    // fake response to simulate a real response from a backend service
    return of(JSON.parse(this._mockupDataURL));
  }
}
