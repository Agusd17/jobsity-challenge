import { TestBed } from '@angular/core/testing';
import { CalendarService } from './calendar.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IReminder } from '../interfaces';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = new CalendarService(null);
  });

  it('should create a new reminder', () => {
    const mockReminder = {
      dateTime: new Date('2023-11-06T09:00:00'),
      text: 'Mock Reminder Text',
      city: 'Mock City',
      weather: 'Mock Weather',
    };

    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');
    spyOn(service, 'monthUpdated');

    service.createReminder(mockReminder);

    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(service.monthUpdated).toHaveBeenCalled();

    const expectedKey = `month:${mockReminder.dateTime.getFullYear()}-${mockReminder.dateTime.getMonth()}`;
    expect(localStorage.setItem).toHaveBeenCalledWith(
      expectedKey,
      jasmine.any(String)
    );
  });

  it('should delete a reminder', () => {
    const reminderToDelete: IReminder = {
      dateTime: new Date('2023-11-05T00:00:00'),
      text: 'Mock Reminder Text',
      city: 'Mock City',
      weather: 'Mock Weather',
    };

    localStorage.setItem(
      `month:${reminderToDelete.dateTime.getFullYear()}-${reminderToDelete.dateTime.getMonth()}`,
      JSON.stringify({
        weeks: [
          {
            days: [
              { date: '2023-11-05T00:00:00', reminders: [reminderToDelete] },
            ],
          },
        ],
      })
    );

    service.deleteReminder(reminderToDelete);

    const updatedMonthData = JSON.parse(
      localStorage.getItem(
        `month:${reminderToDelete.dateTime.getFullYear()}-${reminderToDelete.dateTime.getMonth()}`
      )
    );

    const deletedReminder = updatedMonthData?.weeks[0]?.days[0]?.reminders[0];
    expect(deletedReminder).toBeUndefined();
  });
});
