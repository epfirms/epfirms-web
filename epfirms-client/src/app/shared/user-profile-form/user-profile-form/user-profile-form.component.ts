import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormSettings } from '@app/core/interfaces/FormSettings';
import { UserProfile } from '@app/core/interfaces/user-profile';
import { USAState } from '@app/shared/utils/us-states/typings';
import { usaStatesFull } from '@app/shared/utils/us-states/states';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent implements OnInit {

  // Input bindings
  @Input() userProfile; 
  @Input() formSettings : FormSettings;

  // bindings that control state of dropdown
  dropdownVisible : boolean = false;

  //binding for the title at top of card
  title : string = "TITLE GOES HERE";
  //binding for the subtitle below the title
  subtitle : string = "SUBTITLE GOES HERE";
  // states list
    public usaStates: USAState[] = usaStatesFull;

  // relationship types
  relationshipTypes = [
    "spouse",
    "minor child",
    "adult child",
    "stepchild",
    "parent",
    "grandchild",
    "partner",
    "other"
  ];

    // form group for the user information and to create family member relationship
    userProfileForm = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
      relationship: new FormControl(''),
      ssn : new FormControl(''),
      dob : new FormControl(''),
      dl_number : new FormControl(''),
    });
  constructor() { }

  ngOnInit(): void {
    console.log("User Profile Form Component", this.userProfile);
    this.loadFormSettings();
    this.patchUserProfileForm();
  }

  // loads the form settings from the input
  private loadFormSettings() : void {
    this.title = this.formSettings.title;
    this.subtitle = this.formSettings.subtitle;
  }

  // patch the user profile form with the user profile
 private patchUserProfileForm() : void {
    this.userProfileForm.patchValue({
      first_name: this.userProfile.first_name,
      last_name: this.userProfile.last_name,
      email: this.userProfile.email,
      phone: this.userProfile.phone,
      address: this.userProfile.address,
      city: this.userProfile.city,
      state: this.userProfile.state,
      zip: this.userProfile.zip,
      relationship: this.formSettings.isClient ? null : this.userProfile.family_member.relationship_type,
      ssn : this.userProfile.ssn,
      dob : this.userProfile.dob,
      dl_number : this.userProfile.dl_number,
    });
  }


  // method that toggles the visiblity of the dropdown
  toggleDropdown() : void {
    this.dropdownVisible = !this.dropdownVisible;
  }


  submit() : void {
    this.toggleDropdown();
  }
}
