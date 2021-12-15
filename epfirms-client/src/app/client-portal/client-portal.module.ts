import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientPortalRoutingModule } from './client-portal-routing.module';
import { ClientPortalComponent } from './client-portal.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { CaseListComponent } from './case-list/case-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntakeModule } from '@app/features/intake/intake.module';
import { ClientDocumentsComponent } from './client-documents/client-documents.component';
import { ClientDocumentUploadComponent } from './client-document-upload/client-document-upload.component';
import { AvatarModule } from '@app/shared/avatar/avatar.module';
import { NavbarModule } from '@app/shared/navbar/navbar.module';


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
    IntakeModule,
    AvatarModule,
    NavbarModule
  ]
})
export class ClientPortalModule { }
