import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-intake',
  templateUrl: './client-intake.component.html',
  styleUrls: ['./client-intake.component.scss']
})
export class ClientIntakeComponent implements OnInit {
  //state that manages the views
  state : number = 0;
  // stack that manages the views and enables the back() functionality
  history = []; 
  //personal information
  personalInformation = {
    isMarried: false,
    dob: "",
  }
  //spouse information
  spouseInformation = {
    dob: "",
  }
  constructor() { }

  ngOnInit(): void {
  }

  setState(state : number) : void {
    this.history.push(this.state); 
    this.state = state;
    
  }

  back() : void {
    this.state = this.history.pop();
  }

}
