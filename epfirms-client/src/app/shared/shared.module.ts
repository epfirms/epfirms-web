import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TwInputDirective } from './_directives/tw-input.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from 'headlessui-angular';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { UserFormModalComponent } from './user-form-modal/user-form-modal.component';
import { BillFormModalComponent } from './bill-form-modal/bill-form-modal.component';
import { PaymentFormModalComponent } from './payment-form-modal/payment-form-modal.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { TippyModule } from '@ngneat/helipopper';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { AvatarModule } from './avatar/avatar.module';

@NgModule({
  declarations: [
    TwInputDirective,
    UserFormModalComponent,
    BillFormModalComponent,
    PaymentFormModalComponent,
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
    PipesModule,
    AvatarModule
  ],
  exports: [
    TwInputDirective,
  ]
})
export class SharedModule { }
