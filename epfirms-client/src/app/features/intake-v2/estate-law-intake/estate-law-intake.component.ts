import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { ClientMatterService } from '@app/client-portal/_services/matter-service/client-matter.service';
import { FormSettings } from '@app/core/interfaces/FormSettings';
import { UserProfile } from '@app/core/interfaces/user-profile';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';

@Component({
  selector: 'app-estate-law-intake',
  templateUrl: './estate-law-intake.component.html',
  styleUrls: ['./estate-law-intake.component.scss'],
})
export class EstateLawIntakeComponent implements OnInit {
  // input bindings
  @Input() intake;
  @Input() matter;
  @Output() onIntakeSubmit = new EventEmitter<boolean>();

  //state that manages the views
  state: number = 0;
  // stack that manages the views and enables the back() functionality
  history = [];

  // client form setting
  clientFormSetting: FormSettings;

  // client and family data
  client: UserProfile;
  spouse: UserProfile;
  children: UserProfile[] = [];
  stepChildren: UserProfile[] = [];

  constructor(
    private clientMatterService: ClientMatterService,
    private familyMemberService: FamilyMemberService,
  ) {}

  ngOnInit(): void {
    this.loadClient();
    this.initFormSettings();
    this.loadExistingFamilyData();
  }

  private loadClient(): void {
    let client = this.matter.client;

    this.client = {
      id: client.id,
      first_name: client.first_name,
      last_name: client.last_name,
      full_name: client.full_name,
      email: client.email,
      address: client.address,
      city: client.city,
      zip: client.zip,
      dob: client.dob,
      middle_name: client.middle_name,
      phone: client.phone,
      state: client.state,
      county: client.county,
      ssn: client.ssn,
      dl_number: client.dl_number,
    };
  }

  private loadExistingFamilyData(): void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe((res) => {
      let spouse = res.filter((member) => member.family_member.relationship_type === 'spouse')[0];
      this.children = res.filter((member) => member.family_member.relationship_type === 'child');
      if (spouse) {
        this.spouse = spouse;
        this.client.has_spouse = true;
      }
      if (this.children.length !== 0) {
        this.client.has_children = true;
        this.client.num_of_children = this.children.length;
      }
      console.log('after load', this.client);
    });
  }
  initFormSettings(): void {
    this.clientFormSetting = {
      title: 'Client Information',
      subtitle: this.matter.client.full_name,
      mode: 'CLIENT',
    };
  }

  setState(state: number): void {
    this.history.push(this.state);
    this.state = state;
  }

  back(): void {
    this.state = this.history.pop();
  }

  submit(): void {
    this.clientMatterService
      .updateMatterIntake({ id: this.intake.id, status: 'complete' })
      .subscribe();
  }
}
