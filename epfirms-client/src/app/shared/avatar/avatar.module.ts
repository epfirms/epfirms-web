import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar.component';
import { CoreModule } from '@app/core/core.module';
import { PipesModule } from '@app/core/pipes/pipes.module';



@NgModule({
  declarations: [
    AvatarComponent
  ],
  imports: [
    CoreModule,
    PipesModule
  ],
  exports: [
    AvatarComponent
  ]
})
export class AvatarModule { }
