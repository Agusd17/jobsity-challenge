import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IReminder, IMonth, IWeek, IDay } from '../interfaces';
import { generateMonth } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  public reminders: IReminder[] = [];
  public selectedReminderDate = new BehaviorSubject<Date | null>(null);

  constructor(private _http: HttpClient) {}

  public setSelectedReminderDate(date: Date): void {
    this.selectedReminderDate.next(date);
  }
  public getCurrentMont(year: number, month: number): Observable<IMonth> {
    // API call...
    // Backend returns the desired Month
    // we fake all that with the method below

    // first we check if there is a previously saved month in localStorage (our source of truth in absence of a real database)
    const existingMonth: string | null =
      localStorage.getItem(`month:${year}-${month}`) || null;
    if (existingMonth) {
      let parsedMonth: IMonth = JSON.parse(existingMonth);
      return of(parsedMonth);
    }
    // if there is no previously saved month, we generate it and save it for future use
    const generatedMonth = generateMonth(year, month);
    localStorage.setItem(
      `month:${year}-${month}`,
      JSON.stringify(generatedMonth)
    );
    return of(generatedMonth);
  }

  public create(data: IReminder): boolean {
    console.log(data);
    try {
      let targetMonth: IMonth | null = null;
      const existingMonth = localStorage.getItem(
        `month:${data.dateTime.getFullYear()}-${data.dateTime.getMonth()}`
      );

      if (existingMonth) {
        targetMonth = JSON.parse(existingMonth);
      } else {
        targetMonth = generateMonth(
          data.dateTime.getFullYear(),
          data.dateTime.getMonth()
        );
      }

      targetMonth = {
        ...targetMonth,
        weeks: targetMonth.weeks.map((week: IWeek) => {
          return {
            ...week,
            days: week.days.map((day: IDay) => {
              const reminders = day.reminders || [];
              return {
                ...day,
                reminders: this._compareDates(data.dateTime, new Date(day.date))
                  ? [...reminders, data]
                  : reminders,
              };
            }),
          };
        }),
      };
      localStorage.setItem(
        `month:${data.dateTime.getFullYear()}-${data.dateTime.getMonth()}`,
        JSON.stringify(targetMonth)
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  public edit(data: IReminder): void {}

  public list(date: Date): Observable<IReminder[]> {
    console.log(date);
    return of(this.reminders);
  }

  public delete(reminderId: string): boolean {
    return true;
  }

  private _compareDates(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
