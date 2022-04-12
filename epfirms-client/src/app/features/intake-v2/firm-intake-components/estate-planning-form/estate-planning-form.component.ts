import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EstatePlanningQuestions } from '@app/core/interfaces/EstatePlanningQuestions';
import { SpecificRequests } from '@app/core/interfaces/SpecificRequests';
import { EstatePlanningService } from '../../services/estate-planning.service';
import { ExcludedChildrenService } from '../../services/excluded-children.service';
import { SpecificRequestsService } from '../../services/specific-requests.service';



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

//array of the specific requests
specificRequests : SpecificRequests[] = [];

  constructor(
    private estatePlanningService : EstatePlanningService,
    private specificRequestsService : SpecificRequestsService,
    private excludedChildrenService : ExcludedChildrenService
  ) {}

  ngOnInit(): void {
    this.form = new EstatePlanningQuestions(this.matter.client.id, this.matter.id);
    this.loadEstateForm();
  }

submit(): void {
  this.submitEstateForm();
}

  submitEstateForm(): void {
    console.log("form", this.form);
    this.estatePlanningService.upsertEstatePlanningQuestions(this.form).subscribe(res => {
      console.log(res);
    });
  }

  loadEstateForm() : void {
    this.estatePlanningService.getEstatePlanningQuestions(this.matter.id).subscribe(res => {
      console.log("loadEstateForm", res);
      if (res.length !== 0) {

      this.form = res[0];
      }
    });
  }


addSpecificRequest(): void {
    this.specificRequests.push(new SpecificRequests(this.matter.id));
}

 backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }

}
