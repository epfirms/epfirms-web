import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent implements OnInit {

  // bindings that control state of dropdown
  dropdownVisible : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  // method that toggles the visiblity of the dropdown
  toggleDropdown() : void {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
