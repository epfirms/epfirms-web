import { NgModule } from '@angular/core';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { CoreModule } from '@app/core/core.module';
import { SettingsPageRoutingModule } from './settings-page-routing.module';



@NgModule({
  declarations: [
    SettingsPageComponent
  ],
  imports: [
    CoreModule,
    SettingsPageRoutingModule
  ]
})
export class SettingsPageModule { }
