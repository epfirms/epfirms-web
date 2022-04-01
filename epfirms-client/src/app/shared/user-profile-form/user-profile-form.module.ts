import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileFormComponent } from './user-profile-form/user-profile-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserProfileFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    UserProfileFormComponent,
  ]
})
export class UserProfileFormModule { }
