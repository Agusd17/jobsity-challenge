import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
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
export class CalendarComponent implements OnInit, OnDestroy {
  public days = Days;
  public modalVisible = false;
  public currentWeeks: IWeek[] = [];
  public selectedMonth: IMonth | null = null;
  public selectedMonthIndex: number;

  private _onDestroy$ = new Subject<boolean>();

  constructor(
    private _calendarService: CalendarService,
    private _weatherService: WeatherService,
    private _matDialog: MatDialog
  ) {
    this._calendarService
      .getCurrentMont(new Date().getFullYear(), new Date().getMonth())
      .pipe(take(1))
      .subscribe((response) => {
        this.selectedMonth = response;
        this.selectedMonthIndex = new Date().getMonth();
        console.log('Current month:');
        console.log(response);
      });
  }

  public ngOnInit(): void {
    this._calendarService
      .list(new Date())
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((reminders: IReminder[]) => {
        reminders.map((reminder: IReminder) => {
          return {
            ...reminder,
            weather: this.getWeather(reminder.city),
          };
        });
        console.log(reminders);
      });
  }

  public ngOnDestroy() {
    this._onDestroy$.next(true);
    this._onDestroy$.complete();
  }

  public getWeather(city: string) {
    const x = this._weatherService.getWeatherInformation(city);
    console.log(x);
    return x;
  }

  public openReminderForm(reminder?: IReminder) {
    this._matDialog.open(ReminderFormComponent, {
      data: {
        reminder,
      },
    });
  }

  public openModal(date: Date): void {
    if (date.getMonth() !== this.selectedMonthIndex) {
      return;
    }
    this.modalVisible = true;
  }

  public closeModal(): void {
    this.modalVisible = false;
  }

  public updateSelectedMonth(date: Date): void {
    this._calendarService
      .getCurrentMont(date.getFullYear(), date.getMonth())
      .pipe(take(1))
      .subscribe((response) => {
        this.selectedMonth = response;
        this.selectedMonthIndex = date.getMonth();
      });
  }
}
