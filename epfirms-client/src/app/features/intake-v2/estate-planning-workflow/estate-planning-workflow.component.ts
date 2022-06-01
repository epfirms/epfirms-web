import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';
import { UserService } from '@app/features/user/services/user.service';

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadClient();
  }

  // load the client from the service
  private loadClient(): void {
    this.userService.get(this.matter.client_id).subscribe((response) => {
      if (response) {
        console.log('loadClient', response);
        this.client = response;
      }
    });
  }

  setState(state: string): void {
    this.state = state;
  }
}
