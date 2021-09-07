import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAuthRoutingModule } from './user-auth-routing.module';
import { UserAuthComponent } from './user-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxStripeModule } from 'ngx-stripe';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginSelectComponent } from './login-select/login-select.component';
import { VerifyEmailComponent } from './verifyEmail/VerifyEmail.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';


@NgModule({
  declarations: [
    UserAuthComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    LoginSelectComponent,
    VerifyEmailComponent,
    FeedbackPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserAuthRoutingModule,
    SharedModule,
    NgxStripeModule.forRoot('pk_test_NaQ0K78jrNRGyacbblmpM2RW00mvwDjEh6'),
  ]
})
export class UserAuthModule { }
