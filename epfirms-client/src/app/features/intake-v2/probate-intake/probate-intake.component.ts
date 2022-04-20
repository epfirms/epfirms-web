import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-probate-intake',
  templateUrl: './probate-intake.component.html',
  styleUrls: ['./probate-intake.component.scss']
})
export class ProbateIntakeComponent implements OnInit {
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

  submit(): void {
    
    this.continueButton();
  }


}
