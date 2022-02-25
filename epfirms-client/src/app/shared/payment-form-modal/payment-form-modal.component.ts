import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { createMask } from '@ngneat/input-mask';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { EpModalRef } from '../modal/modal-ref';

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

  constructor(private _formBuilder: FormBuilder, private _modalRef: EpModalRef) { }

  ngOnInit(): void {
    this.paymentForm = this._formBuilder.group({
      type: [1],
      amount: [null, [Validators.required]],
      date: [null],
      description: [null],
    });
  }

  setDate(event) {
    const date = new Date(event.target.value + 'T00:00:00');
    this.paymentForm.patchValue({date});
    this.paymentForm.updateValueAndValidity();
  }
}
