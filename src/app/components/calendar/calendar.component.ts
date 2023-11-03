import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Month, Reminder, Week } from 'src/app/interfaces';
import { CalendarService, WeatherService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { Days } from 'src/app/constants';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  public days = Days;
  public currentWeeks: Week[] = [];
  public selectedMonth: Month | null = null;

  private _onDestroy$ = new Subject<boolean>();

  constructor(
    private _calendarService: CalendarService,
    private _weatherService: WeatherService,
    private _matDialog: MatDialog
  ) {
    this._calendarService
      .getCurrentMont('September')
      .pipe(
        takeUntil(this._onDestroy$),
        map((response) => {
          let weeks = response?.weeks;
          const modifiedWeeks = weeks.map((week) => {
            return {
              ...week,
              days: week.days.map((day) => {
                return { ...day, date: day.date.substring(0, 2) };
              }),
            };
          });
          const modifiedResponse = {
            ...response,
            weeks: modifiedWeeks,
          };
          return modifiedResponse;
        })
      )
      .subscribe((response) => {
        this.selectedMonth = response;
        console.log('Current month:');
        console.log(response);
      });
  }

  ngOnInit(): void {
    this._calendarService
      .list(new Date())
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((reminders: Reminder[]) => {
        reminders.map((reminder: Reminder) => {
          return {
            ...reminder,
            weather: this.getWeather(reminder.city),
          };
        });
        console.log(reminders);
      });
  }

  getWeather(city: string) {
    const x = this._weatherService.getWeatherInformation(city);
    console.log(x);
    return x;
  }

  ngOnDestroy() {
    this._onDestroy$.next(true);
    this._onDestroy$.complete();
  }

  openReminderForm(reminder?: Reminder) {
    this._matDialog.open(ReminderFormComponent, {
      data: {
        reminder,
      },
    });
  }
}
