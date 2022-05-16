import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { UserProfile } from '@app/core/interfaces/user-profile';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {
  // INPUT BINDINGS
  @Input() isVisible: boolean;
  @Input() matter;

  //OUTPUT BINDINGS
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();

  // holds the properties of the client
  client;

  //array that holds family members
  familyMembers = [];


  constructor(
    private clientService: ClientService,
    private familyMemberService: FamilyMemberService,
  ) {}

  ngOnInit(): void {
    
    this.loadClientData();
    this.loadFamilyMembers();
  }

  private loadFamilyMembers(): void {
    this.familyMemberService
      .getByUserId(this.client.id)
      .subscribe((familyMembers) => {
        this.familyMembers = familyMembers;
      });
  }

  private loadClientData(): void {
    this.client = this.matter.client;
  }


  addFamilyMember(): void {
    let member = {
      first_name: '',
      last_name: '',
      family_member: {relationship_type: ''},
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      county: '',
      ssn: '',
      dob: '',
      template : true,
      drivers_id: '',

    }
    this.familyMembers.push(member);
  }
  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }
}
