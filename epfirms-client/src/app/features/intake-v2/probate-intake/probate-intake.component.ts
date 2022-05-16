import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Decedent } from '@app/core/interfaces/Decedent';
import { ProbateQuestions } from '@app/core/interfaces/ProbateQuestions';
import { DecedentService } from '../services/decedent.service';

@Component({
  selector: 'app-probate-intake',
  templateUrl: './probate-intake.component.html',
  styleUrls: ['./probate-intake.component.scss'],
})
export class ProbateIntakeComponent implements OnInit {
  @Input() matter;

  form = {
    id: undefined,
    user_id: undefined,
    matter_id: undefined,
    personal_representative_id: undefined,
    date_of_birth: '',
    date_of_death: '',
    place_of_death: '',
    place_of_birth: '',
    us_citizen: true,
    naturalized_citizen: false,
    date_of_naturalization: '',
    place_of_naturalization: '',
    date_of_will: '',
    date_of_codicils: '',
    notes: '',
  };

  constructor(private decedentService: DecedentService) {}

  ngOnInit(): void {
    this.decedentService.getDecedentWithMatterId(this.matter.id).subscribe((decedent) => {
      if (decedent) {
        this.form.id = decedent.id;
        this.form.user_id = decedent.user_id;
        this.form.matter_id = decedent.matter_id;
        this.form.personal_representative_id = decedent.personal_representative_id;
        this.form.date_of_birth = decedent.date_of_birth;
        this.form.date_of_death = decedent.date_of_death;
        this.form.place_of_death = decedent.place_of_death;
        this.form.place_of_birth = decedent.place_of_birth;
        this.form.us_citizen = decedent.us_citizen;
        this.form.naturalized_citizen = decedent.naturalized_citizen;
        this.form.date_of_naturalization = decedent.date_of_naturalization;
        this.form.place_of_naturalization = decedent.place_of_naturalization;
        this.form.date_of_will = decedent.date_of_will;
        this.form.date_of_codicils = decedent.date_of_codicils;
        this.form.notes = decedent.notes;
      }
    });
  }

  submit(): void {
    this.decedentService.upsert(this.form).subscribe((decedent) => {
      console.log(decedent);
      if (decedent) {
        this.form.id = decedent[0].id;
      }
    });
  }
}
