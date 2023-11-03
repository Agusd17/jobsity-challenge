import { Reminder } from './reminder';

export interface Day {
  date: string;
  reminders?: Reminder[];
}
