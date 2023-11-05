import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { IReminder, IMonth, IWeek, IDay } from '../interfaces';
import { generateMonth } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  public reminders: IReminder[] = [];
  public monthUpdatedSubject$ = new Subject<Boolean>();

  constructor(private _http: HttpClient) {}

  public monthUpdated(): void {
    this.monthUpdatedSubject$.next(true);
  }

  public listMonthReminders(year: number, month: number): Observable<IMonth> {
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

  public createReminder(data: IReminder): boolean {
    // we return a boolean to inform of the success of the operation (we currently don't use it)
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
      console.log('successfully created the reminder');
      this.monthUpdated();
      return true;
    } catch (error) {
      console.log('unable to create the reminder');
      return false;
    }
  }

  public editReminder(oldReminder: IReminder, newReminder: IReminder): void {
    this.deleteReminder(oldReminder);
    this.createReminder(newReminder);
  }

  public deleteReminder(oldReminder: IReminder): void {
    try {
      const oldReminderDate = new Date(oldReminder.dateTime);
      const storedDataString = localStorage.getItem(
        `month:${oldReminderDate.getFullYear()}-${oldReminderDate.getMonth()}`
      );
      if (storedDataString) {
        const storedData = JSON.parse(storedDataString);

        // Iterate through the 'weeks' and 'days' to find and remove the user-defined reminder
        storedData.weeks.forEach((week) => {
          week.days.forEach((day) => {
            day.reminders = day.reminders.filter((reminder) => {
              const storedReminderDate = new Date(reminder.dateTime);

              // Compare the stored reminder date with the user-defined reminder date
              return storedReminderDate.getTime() !== oldReminderDate.getTime();
            });
          });
        });

        // Update the localStorage with the modified data (without the deleted reminder)
        localStorage.setItem(
          `month:${oldReminderDate.getFullYear()}-${oldReminderDate.getMonth()}`,
          JSON.stringify(storedData)
        );
      }
      console.log('successfully deleted the reminder');
      this.monthUpdated();
    } catch (error) {
      console.log('unable to delete the reminder');
    }
  }

  private _compareDates(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
