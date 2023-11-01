import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reminder } from '../interfaces/reminder';
import { Month } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  reminders: Reminder[] = [];

  constructor() {}

  public getCurrentMont(month: string): any {
    // API call...
    // Backend returns the desired Month
    // we fake all that with the method below
    this._generateMonth(2023, month, 3);
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
    const monthsInYear = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

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
}
