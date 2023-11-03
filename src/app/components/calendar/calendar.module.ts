import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { ReminderFormModule } from '../reminder-form/reminder-form.module';
import { DayModalComponent } from '../day-modal/day-modal.component';

@NgModule({
  declarations: [CalendarComponent, DayModalComponent],
  exports: [CalendarComponent, DayModalComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    ReminderFormModule,
  ],
  entryComponents: [ReminderFormComponent],
})
export class CalendarModule {}
