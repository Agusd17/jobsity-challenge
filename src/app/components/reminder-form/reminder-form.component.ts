import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReminder } from 'src/app/interfaces/reminder';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss'],
})
export class ReminderFormComponent implements OnInit {
  @Output() updateSelectedDate = new EventEmitter<Date>();

  public selectedDate: Date | null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IReminder) {}

  ngOnInit(): void {}

  public onDateChange(selectedDate: Date): void {
    this.updateSelectedDate.emit(selectedDate);
  }
}
