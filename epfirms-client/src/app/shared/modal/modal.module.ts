import { NgModule } from '@angular/core';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { CoreModule } from '@app/core/core.module';
import { EpModalService } from './modal.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ModalSlideOverContainerComponent } from './modal-slide-over-container/modal-slide-over-container.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';



@NgModule({
  declarations: [
    ModalContainerComponent,
    ModalSlideOverContainerComponent,
    ModalFooterComponent,
  ],
  imports: [
    CoreModule,
    OverlayModule,
    PortalModule
  ],
  providers: [
    EpModalService
  ]
})
export class ModalModule { }
