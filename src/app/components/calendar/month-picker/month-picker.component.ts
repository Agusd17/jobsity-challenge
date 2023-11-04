import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss'],
})
export class MonthPickerComponent {
  @Output() monthChanged = new EventEmitter<Date>();

  public selectedDate: Date = new Date();
  public selectedMonth = new Date().getMonth();
  public selectedMonthName = '';
  public selectedYear = new Date().getFullYear();

  constructor() {}

  public updateSelectedMonth(): void {
    this.monthChanged.emit(this.selectedDate);
  }

  public updateMonth(value: number): void {
    if (this.selectedMonth + value > 11) {
      if (this.selectedYear === 2030) {
        return;
      }
      this.selectedMonth = 0;
    } else if (this.selectedMonth + value < 0) {
      if (this.selectedYear === 2000) {
        return;
      }
      this.selectedMonth = 11;
    } else {
      this.selectedMonth += value;
    }
    this.selectedDate = new Date(this.selectedYear, this.selectedMonth, 1);
    this.updateSelectedMonth();
  }

  public updateYear(value: number): void {
    // set minimun year to 2000 and maximum year to 2030
    if (this.selectedYear + value < 2000) {
      return;
    }
    if (this.selectedYear + value > 2030) {
      return;
    }
    this.selectedYear = this.selectedYear + value;
    this.selectedDate = new Date(this.selectedYear, this.selectedMonth, 1);

    this.updateSelectedMonth();
  }
}
