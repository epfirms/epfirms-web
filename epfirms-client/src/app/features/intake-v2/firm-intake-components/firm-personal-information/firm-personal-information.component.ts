import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { ClientMatterService } from '@app/client-portal/_services/matter-service/client-matter.service';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { USAState } from '@app/shared/utils/us-states/typings';

@Component({
  selector: 'app-firm-personal-information',
  templateUrl: './firm-personal-information.component.html',
  styleUrls: ['./firm-personal-information.component.scss'],
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

  // does the client have a spouse?
  hasSpouse: boolean = false;

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
    email: null,
    phone: '',
    cell_phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    dob: new Date(),
    ssn: '',
    drivers_id: '',
  };

  // client form
  spouseForm = {
    id: undefined,

    first_name: '',
    last_name: '',
    email: null,
    phone: '',
    cell_phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    dob: new Date(),
    ssn: '',
    drivers_id: '',
    relationship_type: 'spouse',
  };

  // relationship types
  relationshipTypes = ['sibling', 'parent', 'grandchild', 'grandparent', 'other'];

  constructor(
    private clientService: ClientService,
    private familyMemberService: FamilyMemberService,
  ) {}

  ngOnInit(): void {
    this.loadClientData();
    this.getFamilyMembers();
  }

  getFamilyMembers(): void {
    this.familyMemberService.getByUserId(this.client.id).subscribe((familyMembers) => {
      // filter out the family members in response
      familyMembers.forEach((member) => {
        if (member.family_member.relationship_type === 'spouse') {
          this.spouse = member;
          this.hasSpouse = true;
          this.loadSpouseForm();
        } else if (member.family_member.relationship_type === 'child') {
          this.loadChildren(member);
        } else {
          this.loadFamilyMembers(member);
        }
      });
    });
  }

  private loadFamilyMembers(member): void {
    let memberForm = {
      id: member.id,
      first_name: member.first_name,
      last_name: member.last_name,
      email: member.email,
      phone: member.phone,
      cell_phone: member.cell_phone,
      address: member.address,
      city: member.city,
      state: member.state,
      zip: member.zip,
      dob: member.dob,
      ssn: member.ssn,
      drivers_id: member.drivers_id,
      relationship_type: member.family_member.relationship_type,
    };
    this.familyMembers.push(memberForm);
  }

  private loadChildren(child): void {
    let childForm = {
      id: child.id,
      first_name: child.first_name,
      last_name: child.last_name,
      email: child.email,
      phone: child.phone,
      cell_phone: child.cell_phone,
      address: child.address,
      city: child.city,
      state: child.state,
      zip: child.zip,
      dob: child.dob,
      ssn: child.ssn,
      drivers_id: child.drivers_id,
      relationship_type: child.family_member.relationship_type,
      parent_1_name: child.family_member.parent_1_name,
      parent_2_name: child.family_member.parent_2_name,
      parent_1_id: child.family_member.parent_1_id,
      parent_2_id: child.family_member.parent_2_id,
    };
    this.children.push(childForm);
  }

  private loadSpouseForm(): void {
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
    this.spouseForm.relationship_type = this.spouse.family_member.relationship_type;
  }
  private loadClientData(): void {
    this.client = this.matter.client;
    console.log('client', this.client);

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

  private upsertSpouse(): void {
    if (this.hasSpouse) {
      this.familyMemberService
        .addFamilyMemberForUser(this.client.id, this.spouseForm)
        .subscribe((res) => {
          this.spouseForm.id = res.id;
          console.log('upsert spouse', res);
        });
    }
  }

  private upsertChildren(): void {
    this.children.forEach((child) => {
      this.familyMemberService
        .addFamilyMemberForUser(this.client.id, child)
        .subscribe((res) => {
          child.id = res.id;
          console.log('upsert child', res);
        });
    });
  }

  private upsertFamilyMembers(): void {
    this.familyMembers.forEach((member) => {
      this.familyMemberService
        .addFamilyMemberForUser(this.client.id, member)
        .subscribe((res) => {
          member.id = res.id
          console.log('upsert family member', res);
        });
    });
  }

  private upsertClient(): void {
    this.clientService.updateClient(this.clientForm).subscribe((res) => {
      console.log('upsert client', res);
    });
  }



  submit(): void {
    this.upsertSpouse();
    this.upsertChildren();
    this.upsertFamilyMembers();
    this.upsertClient();
  }

  addChild(): void {
    let child = {
      id: undefined,
      first_name: '',
      last_name: '',
      email: null,
      phone: '',
      cell_phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      dob: new Date(),
      ssn: '',
      drivers_id: '',
      relationship_type: 'child',
      has_special_needs: false,
      is_excluded: false,
      parent_1_name: this.client.first_name + ' ' + this.client.last_name,
      parent_1_id: this.client.id,
      parent_2_name: this.spouse ? this.spouse.first_name + ' ' + this.spouse.last_name : '',
      parent_2_id: this.spouse ? this.spouse.id : undefined,
    };

    this.children.push(child);
  }

  addFamilyMember(): void {
    let familyMember = {
      id: undefined,
      first_name: '',
      last_name: '',
      email: null,
      phone: '',
      cell_phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      dob: new Date(),
      ssn: '',
      drivers_id: '',
      relationship_type: '',
    };

    this.familyMembers.push(familyMember);
  }

  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }
}
