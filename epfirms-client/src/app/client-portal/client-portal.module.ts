import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'headlessui-angular';
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
import { ClientFinancialsComponent } from './client-financials/client-financials.component';
import { TransactionsComponent } from './client-financials/transactions/transactions.component';


@NgModule({
  declarations: [
    ClientPortalComponent,
    ClientHomeComponent,
    CaseListComponent,
    ClientDocumentsComponent,
    ClientDocumentUploadComponent,
    ClientFinancialsComponent,
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientPortalRoutingModule,
    IntakeModule,
    MenuModule,
    AvatarModule,
    NavbarModule
  ]
})
export class ClientPortalModule { }
