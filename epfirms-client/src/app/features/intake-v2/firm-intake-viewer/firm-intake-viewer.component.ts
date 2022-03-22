import { Component, Input, OnInit } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { ClientMatterService } from '@app/client-portal/_services/matter-service/client-matter.service';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';

@Component({
  selector: 'app-firm-intake-viewer',
  templateUrl: './firm-intake-viewer.component.html',
  styleUrls: ['./firm-intake-viewer.component.scss'],
})
export class FirmIntakeViewerComponent implements OnInit {
  @Input() matter;
  // state for spouse div
  hasSpouse: boolean = false;
  //state for displaying children fields
  hasChildren: boolean = false;
  hasGrandChildren: boolean = false;
  numOfMinorChildren: number = 0;
  numOfAdultChildren: number = 0;
  numOfGrandChildren: number = 0;

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
    relationship_type: 'spouse',
    phone: '',
    state: '',
    county: '',
    ssn: '',
    drivers_id: '',
    note: '',
  };

  //spouse information
  spouse;

  //children
  minorChildren;
  adultChildren;
  grandChildren;

  constructor(
    private clientService: ClientService,
    private familyMemberService: FamilyMemberService,
    private clientMatterService: ClientMatterService,
  ) {}

  ngOnInit(): void {
    this.loadClientData();
    this.loadExistingFamilyData();
    console.log('MATTER', this.matter);
  }

  loadExistingFamilyData(): void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe((res) => {
      this.spouse = res.filter((member) => member.family_member.relationship_type === 'spouse')[0];
      // get all minor children
      this.minorChildren = res.filter(
        (member) => member.family_member.relationship_type === 'child' && member.is_minor,
      );
      // get all adult children
      this.adultChildren = res.filter(
        (member) => member.family_member.relationship_type === 'child' && !member.is_minor,
      );
      // get all grandchildren
      this.grandChildren = res.filter(
        (member) => member.family_member.relationship_type === 'grandchild',
      );

      if (this.spouse) {
        this.hasSpouse = true;
      }
      if (this.minorChildren.length !== 0 || this.adultChildren.length !== 0) {
        this.hasChildren = true;
        this.numOfMinorChildren = this.minorChildren.length;
        this.numOfAdultChildren = this.adultChildren.length;
      }
      if (this.grandChildren.length !== 0) {
        this.hasGrandChildren = true;
        this.numOfGrandChildren = this.grandChildren.length;
      }
    });
  }

  loadClientData(): void {
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
    this.client.note = client.note;
  }

  private addChild(isMinor: boolean, isGrandChild: boolean): void {
    // implement add child for the different types
    let child = {
      id: undefined,
      first_name: '',
      last_name: '',
      full_name: '',
      email: '',
      address: '',
      city: '',
      zip: '',
      dob: undefined,
      relationship_type: isGrandChild ? 'grandchild' : 'child',
      phone: '',
      state: '',
      county: '',
      ssn: '',
      drivers_id: '',
      note: '',
      is_minor: isMinor,
    };

    if (isMinor) {
      this.minorChildren.push(child);
    } else if (isGrandChild) {
      this.grandChildren.push(child);
    } else {
      this.adultChildren.push(child);
    }
  }

  addChildren(num, isMinor: boolean, isGrandChild: boolean): void {
    for (let i = 0; i < num; i++) {
      this.addChild(isMinor, isGrandChild);
    }
  }

  submitClient(): void {
    this.clientService.updateClient(this.client).subscribe();
  }

  submitSpouse(): void {
    this.spouse.relationship_type = 'spouse';
    this.familyMemberService
      .addFamilyMemberForUser(this.client.id, this.spouse)
      .subscribe((res) => {});
  }

  submitChildren(): void {
    this.minorChildren.forEach((child) => {
      this.familyMemberService.addFamilyMemberForUser(this.client.id, child).subscribe();
    });
    this.adultChildren.forEach((child) => {
      this.familyMemberService.addFamilyMemberForUser(this.client.id, child).subscribe();
    });
    this.grandChildren.forEach((child) => {
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
