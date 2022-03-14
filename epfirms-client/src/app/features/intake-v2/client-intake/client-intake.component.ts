import { W } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';

@Component({
  selector: 'app-client-intake',
  templateUrl: './client-intake.component.html',
  styleUrls: ['./client-intake.component.scss'],
})
export class ClientIntakeComponent implements OnInit {
  // input bindings
  @Input() intake;  



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
    dob: undefined,
    relationship_type : "spouse",
    phone: '',
    state: '',
    county: ''
  };
  //children
  children = [];
  // current user
  user;

  constructor(
    private currentUserService: CurrentUserService,
    private clientService : ClientService,
    private familyMemberService : FamilyMemberService,
    ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    console.log(this.intake)
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
    id: this.user.id,
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
        relationship_type: "child",
        city: '',
        zip: '',
        dob: new Date().toString(),
        phone: '',
        state: '',
      });
    }
  }

  submitClient() : void {
    this.clientService.updateClient(this.personalInformation).subscribe();
  }

  submitSpouse() : void {
    this.spouseInformation.relationship_type = "spouse";
    this.familyMemberService.addFamilyMemberForUser(this.user.id, this.spouseInformation).subscribe(res => console.log(res));   
  }

  submitChildren() : void {
    this.children.forEach(child => {
      this.familyMemberService.addFamilyMemberForUser(this.user.id, child).subscribe();
    });
  }

  submitPersonalInformation(): void {
    this.setState(2);
    this.submitClient();
    if (this.hasSpouse) {
      this.submitSpouse();
    }
    if (this.hasChildren) {
      this.submitChildren();
    }
  }
}
