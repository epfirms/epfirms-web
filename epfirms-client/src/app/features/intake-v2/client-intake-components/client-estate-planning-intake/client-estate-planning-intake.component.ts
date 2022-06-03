import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';
import { UserService } from '@app/features/user/services/user.service';
import { IntakeService } from '../../services/intake.service';

@Component({
  selector: 'app-client-estate-planning-intake',
  templateUrl: './client-estate-planning-intake.component.html',
  styleUrls: ['./client-estate-planning-intake.component.scss'],
})
export class ClientEstatePlanningIntakeComponent implements OnInit {
  @Input() matter: Matter;
  // state that manages the views
  state: string = 'personal info';

  // the client information
  client;

  constructor(private userService: UserService, private intakeService: IntakeService) {}

  ngOnInit(): void {
    this.userService.get(this.matter.client_id).subscribe((response) => {
      if (response) {
        console.log('loadClient', response);
        this.client = response;
      }
    });
  }
  setState(state: string): void {
    if (state === 'appointees' && this.matter.matter_intake.is_review_eligible === false) {
      this.matterIntakeAutomation();
    }
    this.state = state;
  }

  // this will set the MatterIntake.is_review_eligible to true
  // this will add task for assigned attorney/employee to review the intake
  // this will send an email to assigned employee that the intake is ready for review
  private matterIntakeAutomation(): void {
    console.log("MATTER", this.matter);
    
    this.intakeService.statusChangeAutomation(this.matter.matter_intake.id, this.matter).subscribe(res => {
      console.log("automation client side res", res);
    });
  }
}
