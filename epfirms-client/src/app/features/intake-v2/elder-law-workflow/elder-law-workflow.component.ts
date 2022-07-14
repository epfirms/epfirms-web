import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/features/matter/matter.model';
import { UserService } from '@app/features/user/services/user.service';
import { FinancialSummaryService } from '../services/financial-summary.service';
import { IntakeService } from '../services/intake.service';
import { WardService } from '../services/ward.service';

@Component({
  selector: 'app-elder-law-workflow',
  templateUrl: './elder-law-workflow.component.html',
  styleUrls: ['./elder-law-workflow.component.scss'],
})
export class ElderLawWorkflowComponent implements OnInit {
  // input bindings
  @Input() matter: Matter;


  // determines whether certain tabs are visible
  // the firm side has more tabs than the client side
  @Input() clientMode: boolean = false;

  // state that manages the views
  state: string = 'caregiver';

  // caregiver
  ward;

  constructor(
    private wardService: WardService,
    private userService: UserService,
    private financialSummaryService: FinancialSummaryService,
    private intakeService : IntakeService
  ) {}



  ngOnInit(): void {
    this.wardService.getWardWithMatterId(this.matter.id).subscribe((response) => {
      if (response) {
        console.log('loadClient', response);
        this.userService.get(response.user_id).subscribe((user) => {
          console.log
          if (user) {
            this.ward = user;
            console.log("should be the ward", this.ward);
            this.financialSummaryService.upsert({user_id: this.ward.id, matter_id: this.matter.id}).subscribe();
          }
        });
      }
    });
  }

  setState(state: string): void {

    if (state === 'appointees' && this.matter.matter_intake.is_review_eligible === false && this.clientMode === true) {
      this.matterIntakeAutomation();
    }
    this.state = state;
  }


// this will set the MatterIntake.is_review_eligible to true
  // this will add task for assigned attorney/employee to review the intake
  // this will send an email to assigned employee that the intake is ready for review
  private matterIntakeAutomation(): void {
    console.log("MATTER", this.matter);
    
    this.intakeService.statusChangeAutomation(this.matter.matter_intake).subscribe(res => {
      console.log("automation client side res", res);
    });
  }
}
