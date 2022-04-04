import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { FormSettings } from '@app/core/interfaces/FormSettings';
import { ClientService } from '@app/firm-portal/_services/client-service/client.service';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { USAState } from '@app/shared/utils/us-states/typings';

@Component({
  selector: 'app-appointee-form',
  templateUrl: './appointee-form.component.html',
  styleUrls: ['./appointee-form.component.scss']
})
export class AppointeeFormComponent implements OnInit {

  // Input bindings
  @Input() userProfile;
  @Input() formSettings: FormSettings;
  @Input() matter; 
  @Input() familyMembers;
  // bindings that control state of dropdown
  dropdownVisible: boolean = false;

  //binding for the title at top of card
  title: string = 'TITLE GOES HERE';
  //binding for the subtitle below the title
  subtitle: string = 'SUBTITLE GOES HERE';
  // states list
  public usaStates: USAState[] = usaStatesFull;


  // relationship types
  relationshipTypes = [
    'spouse',
    'minor child',
    'adult child',
    'stepchild',
    'parent',
    'grandchild',
    'partner',
    'other',
  ];

  appointeeTypes = [
    'executor',
    'trustee',
    'guardian of children',
    'durable power of attorney',
    'medical power of attorney',

  ]

  // form group for the user information and to create family member relationship
  userProfileForm = new FormGroup({
    id: new FormControl(),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(null),
    phone: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
    relationship_type: new FormControl(''),
    appointee_type: new FormControl(),
    selectedMember: new FormControl(),
    // ssn: new FormControl(''),
    // dob: new FormControl(null),
    // drivers_id: new FormControl(''),
  });
  constructor(
    private clientService: ClientService,
    private familyMemberService: FamilyMemberService,
  ) {}

  ngOnInit(): void {
    console.log('User Profile Form Component', this.userProfile);
    this.loadFormSettings();
    this.patchUserProfileForm();
  }

  // loads the form settings from the input
  private loadFormSettings(): void {
    this.title = this.formSettings.title;
    this.subtitle = this.formSettings.subtitle;
  }

  // patch the user profile form with the user profile
  private patchUserProfileForm(): void {
    this.userProfileForm.patchValue({
      id: this.userProfile.id,
      first_name: this.userProfile.first_name,
      last_name: this.userProfile.last_name,
      email: this.userProfile.email === "" ? null : this.userProfile.email,
      phone: this.userProfile.phone,
      address: this.userProfile.address,
      city: this.userProfile.city,
      state: this.userProfile.state,
      zip: this.userProfile.zip,
      relationship_type: this.userProfile.family_member.relationship_type,
      selectedMember: this.userProfile.first_name,
      appointee_type: this.userProfile.appointee.type
      // ssn: this.userProfile.ssn,
      // dob: this.userProfile.dob,
      // drivers_id: this.userProfile.drivers_id,
    });

  }


  // method that toggles the visiblity of the dropdown
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  submit(): void {
    if (this.formSettings.isClient) {
      this.clientService.updateClient(this.userProfileForm.value);
    } else {
      console.log("submitted", this.userProfileForm.value);
    this.familyMemberService.addFamilyMemberForUser(this.matter.client.id,this.userProfileForm.value).subscribe();
    }
    this.subtitle = this.userProfileForm.value.first_name;
    this.toggleDropdown();
  }
}
