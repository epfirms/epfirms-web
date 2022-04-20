import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProbateQuestions } from '@app/core/interfaces/ProbateQuestions';
import { ProbateService } from '../services/probate.service';

@Component({
  selector: 'app-probate-intake',
  templateUrl: './probate-intake.component.html',
  styleUrls: ['./probate-intake.component.scss']
})
export class ProbateIntakeComponent implements OnInit {
  @Input() matter;
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();

  // the form for the probate
form : ProbateQuestions;

  constructor(private probateService : ProbateService) { }

  ngOnInit(): void {
    this.form = new ProbateQuestions();
  }

  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }

  submit(): void {
     
    this.probateService.upsert(this.form).subscribe(res => console.log(res));
    console.log("On submit", this.form);
    this.continueButton();
  }


}
