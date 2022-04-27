import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { ClientMatterService } from '@app/client-portal/_services/matter-service/client-matter.service';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { USAState } from '@app/shared/utils/us-states/typings';

@Component({
  selector: 'app-firm-personal-information',
  templateUrl: './firm-personal-information.component.html',
  styleUrls: ['./firm-personal-information.component.scss']
})
export class FirmPersonalInformationComponent implements OnInit {
  // INPUT BINDINGS
  @Input() isVisible: boolean;
  @Input() matter;

  //OUTPUT BINDINGS
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();

  // holds the properties of the client
  client;
  

  // states list
  public usaStates: USAState[] = usaStatesFull;
  // spouse
  spouse;

  //array that holds family members
  familyMembers = [];

  // array that holds children
  children = [];


  // client form
  clientForm = {
    id: undefined,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    cell_phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    dob: '',
    ssn: '',
    drivers_id: '',
  }


  // client form
  spouseForm = {
    id: undefined,
    
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    cell_phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    dob: '',
    ssn: '',
    drivers_id: '',
  }



  constructor(
    private clientService: ClientService,
    private familyMemberService: FamilyMemberService,
  ) {}

  ngOnInit(): void {
    
    this.loadClientData();
    this.loadFamilyMembers();
  }

  loadFamilyMembers(): void {
    this.familyMemberService
      .getByUserId(this.client.id)
      .subscribe((familyMembers) => {
        this.familyMembers = familyMembers;
        console.log("family members", this.familyMembers);
        this.loadSpouse();
      });
  }
  private loadSpouse() : void {
    this.spouse = this.familyMembers.filter(member => member.family_member.relationship_type === 'spouse')[0];
    if (this.spouse) {
      this.spouseForm.id = this.spouse.id;
      this.spouseForm.first_name = this.spouse.first_name;
      this.spouseForm.last_name = this.spouse.last_name;
      this.spouseForm.email = this.spouse.email;
      this.spouseForm.phone = this.spouse.phone;
      this.spouseForm.cell_phone = this.spouse.cell_phone;
      this.spouseForm.address = this.spouse.address;
      this.spouseForm.city = this.spouse.city;
      this.spouseForm.state = this.spouse.state;
      this.spouseForm.zip = this.spouse.zip;
      this.spouseForm.dob = this.spouse.dob;
      this.spouseForm.ssn = this.spouse.ssn;
      this.spouseForm.drivers_id = this.spouse.drivers_id;
    }
  }

  private loadClientData(): void {
    this.client = this.matter.client;
    console.log("client", this.client);

    this.clientForm.id = this.client.id;
    this.clientForm.first_name = this.client.first_name;
    this.clientForm.last_name = this.client.last_name;
    this.clientForm.email = this.client.email;
    this.clientForm.phone = this.client.phone;
    this.clientForm.cell_phone = this.client.cell_phone;
    this.clientForm.address = this.client.address;
    this.clientForm.city = this.client.city;
    this.clientForm.state = this.client.state;
    this.clientForm.zip = this.client.zip;
    this.clientForm.dob = this.client.dob;
    this.clientForm.ssn = this.client.ssn;
    this.clientForm.drivers_id = this.client.drivers_id;

  }

  addChild() : void {
    let child = {
      id: undefined,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      cell_phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      dob: '',
      ssn: '',
      drivers_id: '',
    }

    this.children.push(child);
  }


  addFamilyMember() : void {
    let familyMember = {
      id: undefined,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      cell_phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      dob: '',
      ssn: '',
      drivers_id: '',
    }

    this.familyMembers.push(familyMember);
  }

  
  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }

}
