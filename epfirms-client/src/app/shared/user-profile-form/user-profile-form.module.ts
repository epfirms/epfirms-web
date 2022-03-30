import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileFormComponent } from './user-profile-form/user-profile-form.component';



@NgModule({
  declarations: [
    UserProfileFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserProfileFormComponent,
  ]
})
export class UserProfileFormModule { }
