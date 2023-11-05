import { generateMonth } from './helper-functions'; // Import your function
import { IMonth, IWeek, IDay } from '../interfaces'; // Import required interfaces
import { MonthsToNumber } from '../constants/enums';

describe('generateMonth', () => {
  it('should generate a month object and check the structure', () => {
    const year = 2023;
    const month = MonthsToNumber.November;
    const generatedMonth: IMonth = generateMonth(year, month);

    expect(generatedMonth.monthName).toBe('November');

    expect(generatedMonth.weeks.length).toBeGreaterThanOrEqual(4);

    generatedMonth.weeks.forEach((week: IWeek) => {
      expect(week.days.length).toBe(7);

      week.days.forEach((day: IDay) => {
        const dateParts = [
          day.date.getFullYear(),
          day.date.getMonth(),
          day.date.getDate(),
        ];
        expect(dateParts.length).toBe(3);

        const yearNumber = dateParts[0];
        const monthNumber = dateParts[1];
        const dayNumber = dateParts[2];

        expect(yearNumber).toBe(year);
        expect(monthNumber >= 1 && monthNumber <= 12).toBe(true);
        expect(dayNumber >= 1 && dayNumber <= 31).toBe(true);
      });
    });
  });
});
