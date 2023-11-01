import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AngularChallenge';

  constructor() {
    interface Week {
      Sunday: Date;
      Monday: Date;
      Tuesday: Date;
      Wednesday: Date;
      Thursday: Date;
      Friday: Date;
      Saturday: Date;
    }

    function getWeeksForMonth(inputDate: Date): Week[] {
      const weeks: Week[] = [];
      const year = inputDate.getFullYear();
      const month = inputDate.getMonth();

      const firstDayOfMonth = new Date(year, month, 0);
      const lastDayOfMonth = new Date(year, month + 1, 0);

      let currentDay = new Date(firstDayOfMonth);

      // Find the starting Sunday of the week containing the 1st day of the month
      while (currentDay.getDay() !== 0) {
        currentDay.setDate(currentDay.getDate() - 1);
      }

      while (currentDay <= lastDayOfMonth) {
        const week: Week = {
          Sunday: new Date(currentDay.setDate(currentDay.getDate() + 1)),
          Monday: new Date(currentDay.setDate(currentDay.getDate() + 1)),
          Tuesday: new Date(currentDay.setDate(currentDay.getDate() + 1)),
          Wednesday: new Date(currentDay.setDate(currentDay.getDate() + 1)),
          Thursday: new Date(currentDay.setDate(currentDay.getDate() + 1)),
          Friday: new Date(currentDay.setDate(currentDay.getDate() + 1)),
          Saturday: new Date(currentDay.setDate(currentDay.getDate() + 1)),
        };
        weeks.push(week);
      }

      return weeks;
    }

    // Usage:
    const inputDate = new Date('10/31/2023'); // Example input date

    const monthWeeks = getWeeksForMonth(inputDate);
    console.log(monthWeeks);
  }
}
