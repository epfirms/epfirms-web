import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileFormComponent } from './user-profile-form/user-profile-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserProfileFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    UserProfileFormComponent,
  ]
})
export class UserProfileFormModule { }
