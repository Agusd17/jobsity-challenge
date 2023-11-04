import { IReminder } from './reminder';

export interface IDay {
  date: Date;
  reminders?: IReminder[];
}
