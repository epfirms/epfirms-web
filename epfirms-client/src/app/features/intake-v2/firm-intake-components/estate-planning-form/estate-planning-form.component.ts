import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-estate-planning-form',
  templateUrl: './estate-planning-form.component.html',
  styleUrls: ['./estate-planning-form.component.scss']
})
export class EstatePlanningFormComponent implements OnInit {

    @Input() matter;
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();


  constructor(
  ) {}

  ngOnInit(): void {
  }
 backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }

}
