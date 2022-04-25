import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatterLabelComponent } from './matter-label/matter-label.component';
import { AvatarModule } from '@app/shared/avatar/avatar.module';
import { CoreModule } from '@app/core/core.module';
import { EditableModule } from '@ngneat/edit-in-place';
import { TippyModule } from '@ngneat/helipopper';
import { HotToastModule } from '@ngneat/hot-toast';



@NgModule({
  declarations: [
    MatterLabelComponent
  ],
  imports: [
    CoreModule,
    AvatarModule,
    EditableModule,
    TippyModule,
    HotToastModule
  ],
  exports: [
    MatterLabelComponent
  ]
})
export class MatterModule { }
