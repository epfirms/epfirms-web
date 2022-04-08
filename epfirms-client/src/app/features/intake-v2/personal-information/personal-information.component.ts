import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
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

//OUTPUT BINDINGS
@Output() back = new EventEmitter<boolean>();
@Output() continue = new EventEmitter<boolean>();

// state for spouse div
  hasSpouse: boolean = false;
  //state for displaying children fields
  hasChildren: boolean = false;
  numOfChildren: number = 0;
  
  personalInformation = {
    id: undefined,
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
  spouseInformation;
 
  //children
  children;

  constructor(
    private clientService : ClientService,
    private familyMemberService : FamilyMemberService,
  ) { }

  ngOnInit(): void {
    this.loadClientData();
    this.loadExistingFamilyData();
  }


  loadExistingFamilyData() : void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe(res => {
      this.spouseInformation = res.filter((member) => member.family_member.relationship_type === "spouse")[0];
      this.children = res.filter((member) => member.family_member.relationship_type === 'child');
      if (this.spouseInformation) {
        this.hasSpouse = true;
      }
      if (this.children.length !== 0) {
        this.hasChildren = true;
        this.numOfChildren = this.children.length;
      }
    });
  }

  loadClientData() : void {
    let client = this.matter.client;
     this.personalInformation.id = client.id;
     this.personalInformation.first_name = client.first_name;
     this.personalInformation.last_name = client.last_name;
     this.personalInformation.full_name = client.full_name;
     this.personalInformation.email = client.email;
     this.personalInformation.phone = client.phone;
     this.personalInformation.address = client.address;
     this.personalInformation.city = client.city;
     this.personalInformation.state = client.state;
     this.personalInformation.zip = client.zip;
     this.personalInformation.county = client.county;
    
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
    this.familyMemberService.addFamilyMemberForUser(this.personalInformation.id, this.spouseInformation).subscribe((res) => {
     
    });   
  }

  submitChildren() : void {
    this.children.forEach(child => {
      this.familyMemberService.addFamilyMemberForUser(this.personalInformation.id, child).subscribe();
    });
  }

  submitPersonalInformation(): void {
    this.submitClient();
    if (this.hasSpouse) {
      this.submitSpouse();
    }
    if (this.hasChildren) {
      this.submitChildren();
    }
    
    this.continueButton();
   
  }

  backButton() : void {
    this.back.emit(true);
  }

  continueButton() : void {
    this.continue.emit(true);
  }
}
