import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatterLabelComponent } from './matter-label/matter-label.component';
import { AvatarModule } from '@app/shared/avatar/avatar.module';



@NgModule({
  declarations: [
    MatterLabelComponent
  ],
  imports: [
    CommonModule,
    AvatarModule
  ],
  exports: [
    MatterLabelComponent
  ]
})
export class MatterModule { }
