import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.scss'],
})
export class DayModalComponent {
  @Output() closeModal = new EventEmitter<Boolean>();

  constructor() {}

  public close(): void {
    this.closeModal.emit(true);
  }
}
