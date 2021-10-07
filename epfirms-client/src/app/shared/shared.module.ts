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
import { DatepickerModule } from 'ng2-datepicker';
import { TagComponent } from './tag/tag.component';
import { AvatarComponent } from './avatar/avatar.component';
import { SelectComponent } from './select/select.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentActionsComponent } from './documents/document-actions/document-actions.component';
import { DocumentEditModalComponent } from './documents/document-edit-modal/document-edit-modal.component';
import { SearchbarComponent } from './searchbar/searchbar/searchbar.component';
import { SearchPipe } from './_pipes/search.pipe';
import { InitialsPipe } from './_pipes/initials.pipe';
import { PaginatorComponent } from './paginator/paginator.component';
import { TableSectionComponent } from './table-section/table-section.component';
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
    SelectComponent,
    DocumentsComponent,
    DocumentActionsComponent,
    DocumentEditModalComponent,
    SearchbarComponent,
    SearchPipe,
    InitialsPipe,
    PaginatorComponent,
    TableSectionComponent,
    AddMoneyAccountComponent,
    AddVehicleComponent,
    AddRealEstateComponent,
    AddFamilyMemberComponent,
    AddAppointeeComponent,
    UserFormModalComponent,
    BillFormModalComponent,
    PaymentFormModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DatepickerModule,
    MenuModule,
    AngularMyDatePickerModule,
    InputMaskModule
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
    SelectComponent,
    DocumentsComponent,
    SearchPipe,
    InitialsPipe,
    PaginatorComponent,
    TableSectionComponent
  ]
})
export class SharedModule { }
