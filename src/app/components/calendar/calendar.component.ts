import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { IMonth, IReminder, IWeek } from 'src/app/interfaces';
import { CalendarService, WeatherService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { Days } from 'src/app/constants';
import { IDay } from 'src/app/interfaces/day';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnDestroy {
  public days = Days;
  public selectedDay: IDay;
  public currentSelectedDate: Date;
  public modalVisible = false;
  public currentWeeks: IWeek[] = [];
  public selectedMonth: IMonth | null = null;
  public selectedMonthIndex: number;

  private _monthUpdateSubscription$: Subscription;
  private _onDestroy$ = new Subject<boolean>();

  constructor(
    private _calendarService: CalendarService,
    private _weatherService: WeatherService,
    private _matDialog: MatDialog
  ) {
    this._monthUpdateSubscription$ = this._calendarService.monthUpdatedSubject$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(() => this.updateSelectedMonth(this.currentSelectedDate));

    this.currentSelectedDate = new Date();
    this._calendarService
      .listMonthReminders(
        this.currentSelectedDate.getFullYear(),
        this.currentSelectedDate.getMonth()
      )
      .pipe(
        take(1),
        map((response) => {
          const modifiedResponse = {
            ...response,
            weeks: response.weeks.map((week: IWeek) => {
              return {
                ...week,
                days: week.days.map((day: IDay) => {
                  let updatedReminders = day.reminders || [];

                  if (day.reminders && Array.isArray(day.reminders)) {
                    updatedReminders = day.reminders.sort(
                      (a, b) =>
                        new Date(a.dateTime).getTime() -
                        new Date(b.dateTime).getTime()
                    );
                  }
                  return { ...day, date: new Date(day.date) };
                }),
              };
            }),
          };
          return modifiedResponse;
        })
      )
      .subscribe((response) => {
        this.selectedMonth = response;
        this.selectedMonthIndex = new Date().getMonth();
      });
  }

  public ngOnDestroy() {
    this._onDestroy$.next(true);
    this._onDestroy$.complete();
  }

  public openReminderForm(reminder?: IReminder) {
    this._matDialog.open(ReminderFormComponent, {
      data: {
        reminder,
      },
    });
  }

  public openModal(day: IDay): void {
    if (day.date.getMonth() !== this.selectedMonthIndex) {
      return;
    }
    this.selectedDay = day;
    this.modalVisible = true;
  }

  public closeModal(): void {
    this.modalVisible = false;
  }

  public updateSelectedMonth(date: Date): void {
    this.currentSelectedDate = date;
    this._calendarService
      .listMonthReminders(date.getFullYear(), date.getMonth())
      .pipe(
        take(1),
        map((response) => {
          const modifiedResponse = {
            ...response,
            weeks: response.weeks.map((week: IWeek) => {
              return {
                ...week,
                days: week.days.map((day: IDay) => {
                  let updatedReminders = day.reminders || [];

                  if (day.reminders && Array.isArray(day.reminders)) {
                    updatedReminders = day.reminders.sort(
                      (a, b) =>
                        new Date(a.dateTime).getTime() -
                        new Date(b.dateTime).getTime()
                    );
                  }
                  return { ...day, date: new Date(day.date) };
                }),
              };
            }),
          };
          return modifiedResponse;
        })
      )
      .subscribe((response) => {
        this.selectedMonth = response;
        this.selectedMonthIndex = date.getMonth();
      });
  }
}
