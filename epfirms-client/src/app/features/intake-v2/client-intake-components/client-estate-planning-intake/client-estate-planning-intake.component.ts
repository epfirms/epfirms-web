import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';
import { UserService } from '@app/features/user/services/user.service';

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
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
