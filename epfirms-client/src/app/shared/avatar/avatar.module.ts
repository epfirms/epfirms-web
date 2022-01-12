import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar.component';
import { CoreModule } from '@app/core/core.module';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { AvatarGroupComponent } from './avatar-group/avatar-group.component';



@NgModule({
  declarations: [
    AvatarComponent,
    AvatarGroupComponent
  ],
  imports: [
    CoreModule,
    PipesModule
  ],
  exports: [
    AvatarComponent,
    AvatarGroupComponent
  ]
})
export class AvatarModule { }
