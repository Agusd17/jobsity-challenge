import { take, map } from 'rxjs/operators';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateTimeOptions, generateWeatherDate } from 'src/app/helpers';
import { IReminder } from 'src/app/interfaces/reminder';
import { CalendarService, WeatherService } from 'src/app/services';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss'],
})
export class ReminderFormComponent {
  @Input() originalReminder: IReminder | null = null;

  public editMode = false;
  public selectedDate: Date = new Date();
  public selectedHour = '00:00';
  public maxReminderLength = 30;
  public timeOptions: string[] = [];
  public reminderText = '';
  public reminderCity = '';
  public weatherIcon = '';
  public minSelectableDate: Date;
  public maxSelectableDate: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IReminder,
    private _matDialogRef: MatDialogRef<ReminderFormComponent>,
    private _calendarService: CalendarService,
    private _weatherService: WeatherService
  ) {
    this.minSelectableDate = new Date('2000-01-01');
    this.maxSelectableDate = new Date('2030-12-31');
    this.timeOptions = generateTimeOptions();

    // if data exists, we are editing an existing reminder
    if (data && data.dateTime) {
      this.editMode = true;
      this.originalReminder = data;
      const convertedDate = new Date(data.dateTime);
      this.selectedHour = `${convertedDate
        .getHours()
        .toString()
        .padStart(2, '0')}:${convertedDate
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
      this.selectedDate = convertedDate;
      this.reminderText = data.text;
      this.reminderCity = data.city;
      this.weatherIcon = data.weather;
    }
  }

  public onDateChange(selectedDate: Date): void {
    this.selectedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      +this.selectedHour.substring(0, 2),
      +this.selectedHour.substring(3, 5)
    );
  }

  public onHourChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.selectedHour = value;

    this.selectedDate = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      this.selectedDate.getDate(),
      +this.selectedHour.substring(0, 2),
      +this.selectedHour.substring(3, 5)
    );
  }

  public closeModal(): void {
    this._matDialogRef.close();
  }

  public createReminder(): void {
    const formattedWeatherDate = generateWeatherDate(this.selectedDate);
    this._weatherService
      .getWeatherInformation(this.reminderCity, formattedWeatherDate)
      .pipe(take(1))
      .subscribe((response) => {
        this._calendarService.createReminder({
          dateTime: this.selectedDate,
          text: this.reminderText,
          city: this.reminderCity,
          weather: response?.days[0]?.icon || '',
        });
      });
    this.closeModal();
  }

  public updateReminder(): void {
    if (!this.originalReminder) {
      return;
    }
    const formattedWeatherDate = generateWeatherDate(this.selectedDate);
    this._weatherService
      .getWeatherInformation(this.reminderCity, formattedWeatherDate)
      .pipe(take(1))
      .subscribe((response) => {
        this._calendarService.editReminder(this.originalReminder, {
          dateTime: this.selectedDate,
          text: this.reminderText,
          city: this.reminderCity,
          weather: response?.days[0]?.icon || '',
        });
      });
    this.closeModal();
  }
}
