import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-appointees',
  templateUrl: './appointees.component.html',
  styleUrls: ['./appointees.component.scss'],
})
export class AppointeesComponent implements OnInit {
  @Input() matter;
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}
  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }
}
