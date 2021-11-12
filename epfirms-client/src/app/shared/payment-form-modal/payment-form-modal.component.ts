import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { createMask } from '@ngneat/input-mask';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';

@Component({
  selector: 'app-payment-form-modal',
  templateUrl: './payment-form-modal.component.html',
  styleUrls: ['./payment-form-modal.component.scss']
})
export class PaymentFormModalComponent implements OnInit {
  paymentForm: FormGroup;

  myOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'mmm d, yyyy',
    alignSelectorRight: true
  };

  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
  });

  constructor(private _formBuilder: FormBuilder, private _dialogRef: DialogRef) { }

  ngOnInit(): void {
    this.paymentForm = this._formBuilder.group({
      type: [1],
      amount: [null, [Validators.required]],
      date: [null],
      description: [null],
    });
  }

  setDate(event) {
    let model: IMyDateModel = {isRange: false, singleDate: {jsDate: event.singleDate.jsDate}, dateRange: null};
    this.paymentForm.patchValue({date: model});
    this.paymentForm.updateValueAndValidity();
  }

  submit() {
    const payment = this.paymentForm.value;
    payment.amount = payment.amount.replace(',', '');
    if (payment.date) {
      payment.date = payment.date.singleDate.jsDate;
    }

    this.close(payment);
  }

  close(data?: any) {
    this._dialogRef.close(data);
  }
}
