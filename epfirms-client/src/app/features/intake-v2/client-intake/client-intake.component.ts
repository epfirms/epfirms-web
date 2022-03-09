import { Component, OnInit } from '@angular/core';

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
  hasSpouse : boolean = false;
  //state for displaying children fields
  hasChildren : boolean = false;
  numOfChildren : number = 0;
  //personal information
  personalInformation = {
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

  constructor() {}

  ngOnInit(): void {}

  setState(state: number): void {
    this.history.push(this.state);
    this.state = state;
  }

  back(): void {
    this.state = this.history.pop();
  }

  addChild(): void {
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
}
