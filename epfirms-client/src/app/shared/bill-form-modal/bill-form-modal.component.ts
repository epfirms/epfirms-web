import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';

@Component({
  selector: 'app-bill-form-modal',
  templateUrl: './bill-form-modal.component.html',
  styleUrls: ['./bill-form-modal.component.scss']
})
export class BillFormModalComponent implements OnInit {
  billForm: FormGroup;
  billingTypeOptions: string[] = [
    'flat rate',
    'hourly',
    'contingency'
  ];

  paymentTypeOptions: string[] = [
    'private pay',
    'legal insurance'
  ];

  trackTimeForOptions: any[] = [];

  myOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'mmm d, yyyy',
    alignSelectorRight: true
  };

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.billForm = this._formBuilder.group({
      type: [0],
      billing_type: ['', [Validators.required]],
      payment_type: [''],
      amount: [null, [Validators.required]],
      date: [null],
      description: [null],
      track_time_for: [null],
      hourly_rate: [null],
      start_date: [null],
      start_time: [null],
      end_date: [null],
      end_time: [null],
      settlement_percentage: [null],
      settlement_amount: [null],
      settlement_date: [null]
    });
  }

  setBillingType(type: string) {
    this.billForm.patchValue({billing_type: type});
    this.billForm.updateValueAndValidity();
  }

  setPaymentType(type: string) {
    this.billForm.patchValue({payment_type: type});
    this.billForm.updateValueAndValidity();
  }

  setDate(event) {
    let model: IMyDateModel = {isRange: false, singleDate: {jsDate: new Date(event.singleDate.jsDate)}, dateRange: null};
    this.billForm.patchValue({date: model});
    this.billForm.updateValueAndValidity();
  }
}
