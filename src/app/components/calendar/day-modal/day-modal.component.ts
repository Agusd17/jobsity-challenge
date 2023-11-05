import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDay, IReminder } from 'src/app/interfaces';
import { ReminderFormComponent } from '../../reminder-form/reminder-form.component';
import { CalendarService } from 'src/app/services';

@Component({
  selector: 'app-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.scss'],
})
export class DayModalComponent {
  @Input() day: IDay;
  @Output() closeModal = new EventEmitter<Boolean>();

  constructor(
    private _matDialog: MatDialog,
    private _calendarService: CalendarService
  ) {}

  public close(): void {
    this.closeModal.emit(true);
  }

  public editReminder(reminder: IReminder): void {
    this._matDialog.open(ReminderFormComponent, {
      data: {
        ...reminder,
      },
    });
    this.close();
  }

  public deleteReminder(reminder: IReminder): void {
    this._calendarService.deleteReminder(reminder);
    this.close();
  }
}
