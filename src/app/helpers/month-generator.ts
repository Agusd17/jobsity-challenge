import { IMonth, IWeek, IDay } from '../interfaces';

export function generateMonth(year: number, month: number): IMonth {
  // we generate a new date, on the first day of the month, based on the year and month received.
  // this will be the starting point to generate the full calendar month
  const currentDate = new Date(year, month, 1);

  //we create a month object, and start by adding the month's name
  const monthObject: IMonth = {
    monthName: currentDate.toLocaleString('default', { month: 'long' }),
    weeks: [],
  };

  // we save the first day and the last day of the month
  const startDayIndex = currentDate.getDay();

  let week: IWeek = { days: [] };

  // In order to fill the start of the first week with the days of the previous month
  // we need to first verify if the current month is the first of the year
  // in that case, we need to get the last day of the previous month, of the previous year
  // so we declare two new constants, that will check this scenario
  const verifiedYear = month === 0 ? year - 1 : year;
  const verifiedMonth = month === 0 ? 11 : month - 1;
  const prevMonthLastDay = new Date(verifiedYear, month, 0).getDate(); // we use month here, because day 0 equals the last day of the past month

  for (let i = startDayIndex - 1; i >= 0; i--) {
    //we start from the initial day of the selected month, and go backwards, filling the empty days of the week with previous month days

    const day: IDay = {
      date: new Date(verifiedYear, verifiedMonth, prevMonthLastDay - i),
    };
    week.days.push(day);
  }

  // once finished, we move on populating the rest of the week days, until we get to 6 (Saturday)
  for (let i = startDayIndex; i < 7; i++) {
    const day: IDay = {
      date: new Date(year, month, currentDate.getDate()),
    };
    week.days.push(day);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  monthObject.weeks.push(week);

  // after the initial week has been completed, we keep going with the rest of the month
  while (currentDate.getMonth() === month) {
    week = { days: [] };

    for (let i = 0; i < 7; i++) {
      if (currentDate.getMonth() !== month) break; // the first thing we check in the loop is if the current day is part of the next month
      const day: IDay = {
        date: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        ),
      };
      week.days.push(day);

      currentDate.setDate(currentDate.getDate() + 1);
    }

    monthObject.weeks.push(week);
  }

  // after we completed filing the days of the month, we check if there are remaining days in the last week
  //if so, we complete them with the following month's initial days
  const lastWeek = monthObject.weeks[monthObject.weeks.length - 1];

  let dayCounter = 1; // because the first day of any month is always 1
  const nextMonth = month + 1 === 12 ? 0 : month + 1;
  const nextYear = nextMonth === 0 ? year + 1 : year; // we check if we need to move to the next year or not

  for (let i = lastWeek.days.length; i < 7; i++) {
    lastWeek.days.push({ date: new Date(nextYear, nextMonth, dayCounter) });
    dayCounter++;
  }

  return monthObject;
}
