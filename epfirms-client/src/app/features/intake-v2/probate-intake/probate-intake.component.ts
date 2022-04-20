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
  @Input() decedent;
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();

  // the form for the probate
form : ProbateQuestions;

  constructor(private probateService : ProbateService) { }

  ngOnInit(): void {
    this.form = new ProbateQuestions();

    console.log("On init", this.form);
  }

  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }

  submit(): void {
    if (this.matter && this.decedent) {

    this.form.matter_id = this.matter.id;
    this.form.user_id = this.decedent.id;
    }
    this.probateService.upsert(this.form).subscribe(res => console.log(res));
    console.log("On submit", this.form);
    this.continueButton();
  }


}
