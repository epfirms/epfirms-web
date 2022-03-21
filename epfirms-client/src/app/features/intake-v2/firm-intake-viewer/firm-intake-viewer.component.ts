import { Component, Input, OnInit } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { ClientMatterService } from '@app/client-portal/_services/matter-service/client-matter.service';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';

@Component({
  selector: 'app-firm-intake-viewer',
  templateUrl: './firm-intake-viewer.component.html',
  styleUrls: ['./firm-intake-viewer.component.scss']
})
export class FirmIntakeViewerComponent implements OnInit {

  @Input() matter;
  // state for spouse div
  hasSpouse: boolean = false;
  //state for displaying children fields
  hasChildren: boolean = false;
  numOfChildren: number = 0;
  
  client = {
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
    county: '',
    ssn: '',
    drivers_id: ''
  };
 
  //spouse information
  spouse;
 
  //children
  children;

  constructor(
    private clientService : ClientService,
    private familyMemberService : FamilyMemberService,
    private clientMatterService : ClientMatterService,
  ) { }

  ngOnInit(): void {
    this.loadClientData();
    this.loadExistingFamilyData();
    console.log("MATTER", this.matter);
  }

  


  loadExistingFamilyData() : void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe(res => {
      this.spouse = res.filter((member) => member.family_member.relationship_type === "spouse")[0];
      this.children = res.filter((member) => member.family_member.relationship_type === 'child');
      if (this.spouse) {
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
     this.client.id = client.id;
     this.client.first_name = client.first_name;
     this.client.last_name = client.last_name;
     this.client.full_name = client.full_name;
     this.client.email = client.email;
     this.client.phone = client.phone;
     this.client.address = client.address;
     this.client.city = client.city;
     this.client.state = client.state;
     this.client.zip = client.zip;
     this.client.county = client.county;
     this.client.ssn = client.ssn;
     this.client.drivers_id = client.drivers_id; 
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

  addChildren(num) : void {
    this.numOfChildren = parseInt(num);
    this.addChild();
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
    
   
  }

}
