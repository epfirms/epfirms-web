import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSelectComponent } from './login-select/login-select.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserAuthComponent } from './user-auth.component';
import { VerifyEmailComponent } from './verifyEmail/VerifyEmail.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';

const loginChildRoutes: Routes = [
  { path: 'select', component: LoginSelectComponent },
  { path: '', component: LoginComponent }
];

const childRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', children: loginChildRoutes },
  { path: 'verify', component: VerifyEmailComponent },
  { path: 'feedback', component: FeedbackPageComponent },
  { path: '**', redirectTo: '/login'}
];

const routes: Routes = [
  { path: '', component: UserAuthComponent, children:  childRoutes },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAuthRoutingModule { }
