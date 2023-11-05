import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayModalComponent } from './day-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('DayModalComponent', () => {
  let component: DayModalComponent;
  let fixture: ComponentFixture<DayModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DayModalComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
