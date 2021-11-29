import { NgModule } from '@angular/core';
import { PaginatorComponent } from './paginator.component';
import { CoreModule } from '@app/core/core.module';



@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    CoreModule
  ],
  exports: [
    PaginatorComponent
  ]
})
export class PaginatorModule { }
