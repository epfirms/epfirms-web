import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { UserProfile } from '@app/core/interfaces/user-profile';
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
  
 client : UserProfile;
 
 spouse: UserProfile;
 

  //children
  children: UserProfile[] = [];
  stepChildren : UserProfile[] = [];


  constructor(
    private clientService : ClientService,
    private familyMemberService : FamilyMemberService,
  ) { }

  ngOnInit(): void {
    console.log("matter", this.matter);
    this.loadClientData();
    this.loadExistingFamilyData();
  }


  loadExistingFamilyData() : void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe(res => {
      let spouse = res.filter((member) => member.family_member.relationship_type === "spouse")[0];
      this.children = res.filter((member) => member.family_member.relationship_type === 'child');
      if (spouse) {
        this.spouse = spouse;
        this.hasSpouse = true;
      }
      if (this.children.length !== 0) {
        this.hasChildren = true;
        this.numOfChildren = this.children.length;
      }
    });
  }

  loadClientData() : void {
    this.client = this.matter.client;
  }


  addChild(): void {
    let client = this.matter.client;
    this.children = [];
    for (let i = 0; i < this.numOfChildren; i++) {
      this.children.push({
        first_name: '',
        last_name: '',
        full_name: '',
        email: '',
        address: client.address,
        relationship_type: "child",
        city: client.city,
        zip: client.zip,
        dob: new Date().toString(),
        phone: '',
        state: client.state,
        county: client.county,
      });
    }
  }

  submitClient() : void {
    this.clientService.updateClient(this.client).subscribe();
  }

  submitSpouse() : void {
    this.spouse.relationship_type = "spouse";
    this.familyMemberService.addFamilyMemberForUser(this.client.id, this.spouse).subscribe((res) => {
     
    });   
  }

  submitChildren() : void {
    this.children.forEach(child => {
      this.familyMemberService.addFamilyMemberForUser(this.client.id, child).subscribe();
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
