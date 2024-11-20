import { NgModule } from '@angular/core';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { CoreModule } from '@app/core/core.module';
import { AuthModule } from '@app/features/auth/auth.module';


@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CoreModule,
    LoginPageRoutingModule,
    AuthModule
  ]
})
export class LoginPageModule { }
