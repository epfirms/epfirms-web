import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bug-reporter-modal',
  templateUrl: './bug-reporter-modal.component.html',
  styleUrls: ['./bug-reporter-modal.component.scss']
})
export class BugReporterModalComponent implements OnInit {

  @Output() close : EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit(true);
  }

}
