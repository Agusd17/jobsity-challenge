import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IReminder, IMonth } from '../interfaces';
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
    //this._generateMonth(2023, month, 3);
    return of(generateMonth(year, month));
  }

  public create(data: IReminder): IReminder {
    return data;
  }

  public edit(data: IReminder): IReminder {
    return data;
  }

  public list(date: Date): Observable<IReminder[]> {
    console.log(date);
    return of(this.reminders);
  }

  public delete(reminderId: string): boolean {
    console.log(reminderId);
    return true;
  }
}
