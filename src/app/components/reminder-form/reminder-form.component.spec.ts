import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderFormComponent } from './reminder-form.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ReminderFormComponent', () => {
  let component: ReminderFormComponent;
  let fixture: ComponentFixture<ReminderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReminderFormComponent],
      imports: [MatDialogModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
