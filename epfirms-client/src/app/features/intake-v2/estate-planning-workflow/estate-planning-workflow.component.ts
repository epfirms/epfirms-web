import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/features/matter/matter.model';
import { UserService } from '@app/features/user/services/user.service';
import { FinancialSummaryService } from '../services/financial-summary.service';

@Component({
  selector: 'app-estate-planning-workflow',
  templateUrl: './estate-planning-workflow.component.html',
  styleUrls: ['./estate-planning-workflow.component.scss'],
})
export class EstatePlanningWorkflowComponent implements OnInit {
  // input bindings
  @Input() matter: Matter;

  // for this workflow, the client needs to be feed to the individual child components because
  // they have been abstracted
  client;

  // state that manages the views
  state: string = 'personal info';

  constructor(private userService: UserService, private financialSummaryService : FinancialSummaryService) {}

  ngOnInit(): void {
    this.loadClient();
  }

  // load the client from the service
  private loadClient(): void {
    this.userService.get(this.matter.client_id).subscribe((response) => {
      if (response) {
        console.log('loadClient', response);
        this.client = response;
        this.financialSummaryService.upsert({user_id: this.client.id, matter_id: this.matter.id}).subscribe();
      }
    });
  }

  setState(state: string): void {
    this.state = state;
  }
}
