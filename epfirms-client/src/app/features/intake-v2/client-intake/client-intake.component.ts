import { W } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';

@Component({
  selector: 'app-client-intake',
  templateUrl: './client-intake.component.html',
  styleUrls: ['./client-intake.component.scss'],
})
export class ClientIntakeComponent implements OnInit {
  //state that manages the views
  state: number = 0;
  // stack that manages the views and enables the back() functionality
  history = [];
  // state for spouse div
  hasSpouse: boolean = false;
  //state for displaying children fields
  hasChildren: boolean = false;
  numOfChildren: number = 0;
  //personal information
  // personalInformation = {
  //   first_name: '',
  //   last_name: '',
  //   full_name: '',
  //   email: '',
  //   address: '',
  //   city: '',
  //   zip: '',
  //   dob: '',
  //   phone: '',
  //   state: '',
  // };
  personalInformation;
  
  //spouse information
  spouseInformation = {
    first_name: '',
    last_name: '',
    full_name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    dob: '',
    phone: '',
    state: '',
  };
  //children
  children = [];
  // current user
  user;

  constructor(
    private currentUserService: CurrentUserService,
    private clientService : ClientService
    
    ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.currentUserService.getCurrentUser().subscribe((res) => {
      this.user = res.user;
      this.initPersonalInformation();
    });
  }
  setState(state: number): void {
    this.history.push(this.state);
    this.state = state;
  }
  // used to fill in the current user information
  initPersonalInformation() : void {
   this.personalInformation = {
    first_name: this.user.first_name,
    last_name: this.user.last_name,
    email: this.user.email,
    address: this.user.address,
    city: this.user.city,
    zip: this.user.zip,
    dob: this.user.dob,
    state: this.user.state
  } 
  }

  back(): void {
    this.state = this.history.pop();
  }

  addChild(): void {
    this.children = [];
    for (let i = 0; i < this.numOfChildren; i++) {
      this.children.push({
        first_name: '',
        last_name: '',
        full_name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        dob: '',
        phone: '',
        state: '',
      });
    }
  }

  submitClient() : void {

  }
}
