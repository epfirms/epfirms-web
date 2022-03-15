import { Component, Input, OnInit } from '@angular/core';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {

// INPUT BINDINGS
@Input() isVisible : boolean;
@Input() matter;

// state for spouse div
  hasSpouse: boolean = false;
  //state for displaying children fields
  hasChildren: boolean = false;
  numOfChildren: number = 0;
  
  personalInformation = {
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
  constructor(
    private clientService : ClientService
  ) { }

  ngOnInit(): void {
  }

  // loadClientData() : void {
  //   let client = this.matter.client;
  //  this.personalInformation = {
  //    first_name: client.first_name,
  //    last_name: client.last_name,
  //    full_name: client.full_name,
  //    email: client.email,
  //    phone: client.phone,
  //    address: client.address,
  //    city: client.city,
  //    state: client.state,
  //    zip: client.zip,
  //    county: client.county
  //  } 
  // }


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

  // submitSpouse() : void {
  //   this.spouseInformation.relationship_type = "spouse";
  //   this.familyMemberService.addFamilyMemberForUser(this.user.id, this.spouseInformation).subscribe((res) => {
  //     if (res) {
  //       this.owners.push(res);
  //     }
  //   });   
  // }

  // submitChildren() : void {
  //   this.children.forEach(child => {
  //     this.familyMemberService.addFamilyMemberForUser(this.user.id, child).subscribe();
  //   });
  // }

  // submitPersonalInformation(): void {
  //   this.setState(2);
  //   this.owners = [];
  //   this.submitClient();
  //   if (this.hasSpouse) {
    
  //     this.submitSpouse();
  //   }
  //   if (this.hasChildren) {
  //     this.submitChildren();
  //   }
   
  // }


}
