import { NgModule } from '@angular/core';
import { DocumentActionsComponent } from './document-actions/document-actions.component';
import { DocumentEditModalComponent } from './document-edit-modal/document-edit-modal.component';
import { DocumentsComponent } from './documents.component';
import { TippyModule } from '@ngneat/helipopper';
import { CoreModule } from '@app/core/core.module';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { ButtonModule } from '@app/shared/button/button.module';



@NgModule({
  declarations: [
    DocumentsComponent,
    DocumentActionsComponent,
    DocumentEditModalComponent,
  ],
  imports: [
    CoreModule,
    TippyModule,
    PipesModule,
    ButtonModule
  ],
  exports: [
    DocumentsComponent,
    DocumentActionsComponent,
    DocumentEditModalComponent,
  ]
})
export class DocumentsModule { }
