import { NgModule } from '@angular/core';
import { DocumentActionsComponent } from './document-actions/document-actions.component';
import { DocumentEditModalComponent } from './document-edit-modal/document-edit-modal.component';
import { DocumentsComponent } from './documents.component';
import { TippyModule } from '@ngneat/helipopper';
import { CoreModule } from '@app/core/core.module';
import { PdfViewerModule } from '@app/shared/pdf-viewer/pdf-viewer.module';
import { PipesModule } from '@app/core/pipes/pipes.module';



@NgModule({
  declarations: [
    DocumentsComponent,
    DocumentActionsComponent,
    DocumentEditModalComponent,
  ],
  imports: [
    CoreModule,
    TippyModule,
    PdfViewerModule,
    PipesModule
  ],
  exports: [
    DocumentsComponent,
    DocumentActionsComponent,
    DocumentEditModalComponent,
  ]
})
export class DocumentsModule { }
