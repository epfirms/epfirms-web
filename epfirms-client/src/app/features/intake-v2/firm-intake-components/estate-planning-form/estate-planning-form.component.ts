import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EstatePlanningQuestions } from '@app/core/interfaces/EstatePlanningQuestions';

@Component({
  selector: 'app-estate-planning-form',
  templateUrl: './estate-planning-form.component.html',
  styleUrls: ['./estate-planning-form.component.scss']
})
export class EstatePlanningFormComponent implements OnInit {

    @Input() matter;
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();


  form : EstatePlanningQuestions;
  constructor(
  ) {}

  ngOnInit(): void {
    this.form = new EstatePlanningQuestions();
  }
 backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }

}
