import { NgModule } from '@angular/core';
import { MatterLabelComponent } from './matter-label/matter-label.component';
import { AvatarModule } from '@app/shared/avatar/avatar.module';
import { CoreModule } from '@app/core/core.module';
import { EditableModule } from '@ngneat/edit-in-place';
import { TippyModule } from '@ngneat/helipopper';
import { HotToastModule } from '@ngneat/hot-toast';
import { EffectsModule } from '@ngrx/effects';
import { MatterEffects } from './matter.effects';
import { StoreModule } from '@ngrx/store';
import * as fromMatter from './matter.reducer';


@NgModule({
  declarations: [
    MatterLabelComponent
  ],
  imports: [
    CoreModule,
    AvatarModule,
    EditableModule,
    TippyModule,
    HotToastModule,
    StoreModule.forFeature(fromMatter.mattersFeatureKey, fromMatter.reducer),
    EffectsModule.forFeature([MatterEffects])
  ],
  exports: [
    MatterLabelComponent
  ]
})
export class MatterModule { }
