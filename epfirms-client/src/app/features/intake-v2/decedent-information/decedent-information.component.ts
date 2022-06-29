import { Component, Input, OnInit } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { UserService } from '@app/features/user/services/user.service';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { USAState } from '@app/shared/utils/us-states/typings';
import { Decedent } from '@app/core/interfaces/Decedent';
import { DecedentService } from '../services/decedent.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';

@Component({
  selector: 'app-decedent-information',
  templateUrl: './decedent-information.component.html',
  styleUrls: ['./decedent-information.component.scss'],
})
export class DecedentInformationComponent implements OnInit {
  // INPUT BINDINGS
  @Input() isVisible: boolean;
  @Input() matter;

  // holds the properties of the client
  // note that in this case, the client is the decedent user profile
  client;

  //decedent holds the record from the DB about the decedent and the matter
  decedent;
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
    dob: undefined,
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
    dob: undefined,
    ssn: '',
    drivers_id: '',
    relationship_type: 'spouse',
  };

  // relationship types
  relationshipTypes = ['sibling', 'parent', 'grandchild', 'grandparent', 'other'];

  constructor(
    private familyMemberService: FamilyMemberService,
    private userService: UserService,
    private decedentService: DecedentService,
    private _matterService: MatterService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  getFamilyMembers(): void {
    this.familyMemberService.getByUserId(this.client.id).subscribe((familyMembers) => {
      if (familyMembers) {
        // filter out the family members in response
        familyMembers.forEach((member) => {
          if (member.family_member.relationship_type === 'spouse') {
            this.spouse = member;
            this.hasSpouse = true;
            this.loadSpouseForm();
          } else if (member.family_member.relationship_type === 'child') {
            console.log('on load child', member);
            this.loadChildren(member);
          } else {
            this.loadFamilyMembers(member);
          }
        });
      }
    });
  }

  private init(): void {
    // check to see if there is a decedent record assosciated with the matter id

    this.decedentService.getDecedentWithMatterId(this.matter.id).subscribe((decedent) => {
      if (decedent) {
        this.decedent = decedent;

        // if there is a decedent record, make the call to the user service to get the decedent user profile
        this.userService.get(decedent.user_id).subscribe((user) => {
          if (user) {
            this.client = user;
            this.loadClientData();
            this.getFamilyMembers();
          }
        });
      } else {
        // if there is no decedent record, make the new user, and then create decedent record
        this.userService.upsert(this.clientForm).subscribe((createdUser) => {
          if (createdUser) {
            this.client = createdUser[0];
            this.loadClientData();
            this.getFamilyMembers();
            this.decedentService
              .upsert({
                user_id: this.client.id,
                matter_id: this.matter.id,
                personal_representative_id: this.matter.client.id,
              })
              .subscribe((createdDecedent) => {
                if (createdDecedent) {
                  this.decedent = createdDecedent;
                }
              });
          }
        });

        // then init the family members
      }
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
      has_special_needs: child.has_special_needs,
      relationship_type: child.family_member.relationship_type,
      parent_1_name: child.parent_1_name,
      parent_2_name: child.parent_2_name,
      parent_1_id: child.parent_1_id,
      parent_2_id: child.parent_2_id,
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


  private updateSpouseIdOnMatter(spouseId) : void {
    this._matterService.update({id: this.matter.id, spouse_id: spouseId}).subscribe(res => {
      console.log(res);
    });

  }

  private upsertSpouse(): void {
    if (this.hasSpouse) {
      this.familyMemberService
        .addFamilyMemberForUser(this.client.id, this.spouseForm)
        .subscribe((res) => {
          if (res) {
            this.spouseForm.id = res.id;
            this.updateSpouseIdOnMatter(res.id);
            console.log('upsert spouse', res);
          }
        });
    }
  }

  private upsertChildren(): void {
    this.children.forEach((child) => {
      console.log('child on upsert', child);
      this.familyMemberService.addFamilyMemberForUser(this.client.id, child).subscribe((res) => {
        if (res) {
          child.id = res.id;
          console.log('upsert child', res);
        }
      });
    });
  }

  private upsertFamilyMembers(): void {
    this.familyMembers.forEach((member) => {
      this.familyMemberService.addFamilyMemberForUser(this.client.id, member).subscribe((res) => {
        if (res) {
          member.id = res.id;
          console.log('upsert family member', res);
        }
      });
    });
  }

  private upsertClient(): void {
    this.userService.upsert(this.clientForm).subscribe((res) => {
      if (res) {
        console.log('upsert client', res);
      }
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
      dob: undefined,
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
      dob: undefined,
      ssn: '',
      drivers_id: '',
      relationship_type: '',
    };

    this.familyMembers.push(familyMember);
  }

  deleteSpouse(): void {
    this.familyMemberService
      .deleteFamilyMemberById(this.client.id, this.spouse.id)
      .subscribe((res) => {
        if (res) {
          console.log('delete spouse', res);
        }
      });
    this.spouse = null;
    this.hasSpouse = false;
  }

  deleteChild(child: any): void {
    this.familyMemberService.deleteFamilyMemberById(this.client.id, child.id).subscribe((res) => {
      if (res) {
        console.log('delete child', res);
        this.children = this.children.filter((child) => child.id !== child.id);
      }
    });
  }

  deleteFamilyMember(familyMember: any): void {
    this.familyMemberService
      .deleteFamilyMemberById(this.client.id, familyMember.id)
      .subscribe((res) => {
        if (res) {
          console.log('delete family member', res);
          this.familyMembers = this.familyMembers.filter(
            (familyMember) => familyMember.id !== familyMember.id,
          );
        }
      });
  }
}
