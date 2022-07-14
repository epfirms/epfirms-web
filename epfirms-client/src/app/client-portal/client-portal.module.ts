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
import { ClientFinancialsComponent } from './client-financials/client-financials.component';
import { TransactionsComponent } from './client-financials/transactions/transactions.component';
import { MenuModule } from '@app/shared/menu/menu.module';
import { StatementViewComponent } from './client-financials/statement-view/statement-view.component';
import { CaseFinanceViewComponent } from './client-financials/case-finance-view/case-finance-view.component';
import { MonthlyPaymentViewComponent } from './client-financials/monthly-payment-view/monthly-payment-view.component';
import { ClientContractsComponent } from './client-contracts/client-contracts.component';
import { ContractBuilderModule } from '@app/features/contract-builder/contract-builder.module';
import { IntakeV2Module } from '@app/features/intake-v2/intake-v2.module';


@NgModule({
  declarations: [
    ClientPortalComponent,
    ClientHomeComponent,
    CaseListComponent,
    ClientDocumentsComponent,
    ClientDocumentUploadComponent,
    ClientFinancialsComponent,
    TransactionsComponent,
    StatementViewComponent,
    CaseFinanceViewComponent,
    MonthlyPaymentViewComponent,
    ClientContractsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientPortalRoutingModule,
    IntakeModule,
    AvatarModule,
    NavbarModule,
    MenuModule,
    ContractBuilderModule,
    IntakeV2Module
  ]
})
export class ClientPortalModule { }
