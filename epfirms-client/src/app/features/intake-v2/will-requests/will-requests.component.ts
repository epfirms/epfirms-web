import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-will-requests',
  templateUrl: './will-requests.component.html',
  styleUrls: ['./will-requests.component.scss']
})
export class WillRequestsComponent implements OnInit {
@Input() matter;
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }
}
