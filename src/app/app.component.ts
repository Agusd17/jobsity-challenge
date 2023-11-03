import { Component } from '@angular/core';
import { generateMonth } from './helpers';
import { MonthsToNumber } from './constants/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AngularChallenge';
  private _months = MonthsToNumber;

  constructor() {
    const generatedMonth = generateMonth(2024, this._months.September);
    console.log(generatedMonth);
  }
}
