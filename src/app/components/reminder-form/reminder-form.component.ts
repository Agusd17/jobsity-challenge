import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IReminder } from 'src/app/interfaces/reminder';
import { CalendarService } from 'src/app/services';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss'],
})
export class ReminderFormComponent {
  @Input() existingReminder: IReminder | null = null;
  @Output() updateSelectedDate = new EventEmitter<Date>();

  public selectedDate: Date | null;
  public maxReminderLength = 30;
  public reminderText = '';
  public reminderCity = '';
  public weatherIcon = '';
  public minSelectableDate: Date;
  public maxSelectableDate: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IReminder,
    private _matDialogRef: MatDialogRef<ReminderFormComponent>,
    private _calendarService: CalendarService
  ) {
    this.minSelectableDate = new Date('2000-01-01');
    this.maxSelectableDate = new Date('2030-12-31');
  }

  public onDateChange(selectedDate: Date): void {
    this.selectedDate = selectedDate;
  }

  public createReminder(): void {
    this._calendarService.create({
      dateTime: this.selectedDate,
      text: this.reminderText,
      city: this.reminderCity,
      weather: this.weatherIcon,
    });
    this._matDialogRef.close();
  }

  public updateReminder(): void {
    if (!this.existingReminder) {
      return;
    }
    this._calendarService.edit({
      dateTime: this.selectedDate,
      text: this.reminderText,
      city: this.reminderCity,
      weather: this.weatherIcon,
    });
  }
}
