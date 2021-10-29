import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'headlessui-angular';
import { ClientPortalRoutingModule } from './client-portal-routing.module';
import { ClientPortalComponent } from './client-portal.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { SharedModule } from '@app/shared/shared.module';
import { ModalModule } from '@app/modal/modal.module';
import { CaseListComponent } from './case-list/case-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntakeModule } from '@app/intake/intake.module';
import { ClientDocumentsComponent } from './client-documents/client-documents.component';
import { ClientDocumentUploadComponent } from './client-document-upload/client-document-upload.component';


@NgModule({
  declarations: [
    ClientPortalComponent,
    ClientHomeComponent,
    CaseListComponent,
    ClientDocumentsComponent,
    ClientDocumentUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientPortalRoutingModule,
    SharedModule,
    ModalModule,
    IntakeModule,
    MenuModule
  ]
})
export class ClientPortalModule { }
