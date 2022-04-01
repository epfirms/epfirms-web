import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormSettings } from '@app/core/interfaces/FormSettings';
import { UserProfile } from '@app/core/interfaces/user-profile';
import { USAState } from '@app/shared/utils/us-states/typings';
import { usaStatesFull } from '@app/shared/utils/us-states/states';

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

  constructor() { }

  ngOnInit(): void {
    console.log("User Profile Form Component", this.userProfile);
    this.loadFormSettings();
  }

  // loads the form settings from the input
  private loadFormSettings() : void {
    this.title = this.formSettings.title;
    this.subtitle = this.formSettings.subtitle;
  }


  // method that toggles the visiblity of the dropdown
  toggleDropdown() : void {
    this.dropdownVisible = !this.dropdownVisible;
  }


  submit() : void {
    this.toggleDropdown();
  }
}
