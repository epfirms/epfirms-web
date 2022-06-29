import { NgModule } from '@angular/core';
import { FirmDetailsPageRoutingModule } from './firm-details-page-routing.module';
import { FirmDetailsPageComponent } from './firm-details-page/firm-details-page.component';
import { CoreModule } from '@app/core/core.module';


@NgModule({
  declarations: [
    FirmDetailsPageComponent
  ],
  imports: [
    CoreModule,
    FirmDetailsPageRoutingModule
  ]
})
export class FirmDetailsPageModule { }
