import { generateMonth } from './month-generator'; // Import your function
import { Month, Week, Day } from '../interfaces'; // Import required interfaces
import { MonthsToNumber } from '../constants/enums';

describe('generateMonth', () => {
  it('should generate a month object and check the structure', () => {
    const year = 2023;
    const month = MonthsToNumber.November;
    const generatedMonth: Month = generateMonth(year, month);

    expect(generatedMonth.monthName).toBe('November');

    expect(generatedMonth.weeks.length).toBeGreaterThanOrEqual(4);

    generatedMonth.weeks.forEach((week: Week) => {
      expect(week.days.length).toBe(7);

      week.days.forEach((day: Day) => {
        const dateParts = day.date.split('/');
        expect(dateParts.length).toBe(3);

        const dayNumber = parseInt(dateParts[0]);
        const monthNumber = parseInt(dateParts[1]);
        const yearNumber = parseInt(dateParts[2]);

        expect(dayNumber >= 1 && dayNumber <= 31).toBe(true);
        expect(monthNumber >= 1 && monthNumber <= 12).toBe(true);
        expect(yearNumber).toBe(year);
      });
    });
  });
});
