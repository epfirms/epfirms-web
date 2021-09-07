import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal.service';


@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  providers: [
    ModalService
  ],
  exports: []
})
export class ModalModule { }
