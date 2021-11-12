import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { TwInputDirective } from './_directives/tw-input.directive';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditableInputComponent } from './editable-input/editable-input.component';
import { EditableAutocompleteComponent } from './editable-autocomplete/editable-autocomplete.component';
import { EditableDatepickerComponent } from './editable-datepicker/editable-datepicker.component';
import { TagComponent } from './tag/tag.component';
import { AvatarComponent } from './avatar/avatar.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentActionsComponent } from './documents/document-actions/document-actions.component';
import { DocumentEditModalComponent } from './documents/document-edit-modal/document-edit-modal.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { MenuModule } from 'headlessui-angular';
import { AddMoneyAccountComponent } from './add-money-account/add-money-account.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddRealEstateComponent } from './add-real-estate/add-real-estate.component';
import { AddFamilyMemberComponent } from './add-family-member/add-family-member.component';
import { AddAppointeeComponent } from './add-appointee/add-appointee.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { UserFormModalComponent } from './user-form-modal/user-form-modal.component';
import { BillFormModalComponent } from './bill-form-modal/bill-form-modal.component';
import { PaymentFormModalComponent } from './payment-form-modal/payment-form-modal.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { TippyModule } from '@ngneat/helipopper';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {EditableModule} from '@ngneat/edit-in-place';
import { PipesModule } from '@app/core/pipes/pipes.module';

@NgModule({
  declarations: [
    InputComponent,
    LayoutComponent,
    NavbarComponent,
    TwInputDirective,
    AutocompleteComponent,
    EditableInputComponent,
    EditableAutocompleteComponent,
    EditableDatepickerComponent,
    TagComponent,
    AvatarComponent,
    DocumentsComponent,
    DocumentActionsComponent,
    DocumentEditModalComponent,
    PaginatorComponent,
    AddMoneyAccountComponent,
    AddVehicleComponent,
    AddRealEstateComponent,
    AddFamilyMemberComponent,
    AddAppointeeComponent,
    UserFormModalComponent,
    BillFormModalComponent,
    PaymentFormModalComponent,
    PdfViewerComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    AngularMyDatePickerModule,
    InputMaskModule,
    TippyModule,
    PdfJsViewerModule,
    EditableModule,
    PipesModule
  ],
  exports: [
    InputComponent,
    LayoutComponent,
    NavbarComponent,
    TwInputDirective,
    AutocompleteComponent,
    EditableInputComponent,
    EditableAutocompleteComponent,
    EditableDatepickerComponent,
    TagComponent,
    AvatarComponent,
    DocumentsComponent,
    PaginatorComponent,
    PdfViewerComponent
  ]
})
export class SharedModule { }
