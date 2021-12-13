import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { createMask } from '@ngneat/input-mask';
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

  trackTimeForOptions: any[] = [
    'Me',
    'Attorney'
  ];

  myOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'mmm d, yyyy',
    alignSelectorRight: true
  };

  rangeOptions: IAngularMyDpOptions = {
    dateRange: true,
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

  timeInputMask = createMask({
    alias: 'datetime',
    inputFormat: 'hh:MM',
    placeholder: 'HH:MM',
    showMaskOnHover: false,
  });

  constructor(private _formBuilder: FormBuilder, private _dialogRef: DialogRef) { }

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
    this.billForm.patchValue({billing_type: type});
    this.billForm.updateValueAndValidity();
  }

  setPaymentType(type: string) {
    this.billForm.patchValue({payment_type: type});
    this.billForm.updateValueAndValidity();
  }

  setDate(event) {
    let model: IMyDateModel = {isRange: false, singleDate: {jsDate: event.singleDate.jsDate}, dateRange: null};
    this.billForm.patchValue({date: model});
    this.billForm.updateValueAndValidity();
  }

  setTrackTimeFor(name: string) {
    this.billForm.patchValue({track_time_for: name});
    this.billForm.updateValueAndValidity();
  }

  setDateRange(event) {
    let startDate: IMyDateModel = {isRange: false, singleDate: {jsDate: event.dateRange.beginJsDate}, dateRange: null};
    let endDate: IMyDateModel = {isRange: false, singleDate: {jsDate: event.dateRange.endJsDate}, dateRange: null};
    this.billForm.patchValue({start_date: startDate, end_date: endDate});
    this.billForm.updateValueAndValidity();
  }

  setSettlementDate(event) {
    let model: IMyDateModel = {isRange: false, singleDate: {jsDate: event.singleDate.jsDate}, dateRange: null};
    this.billForm.patchValue({settlement_date: model});
    this.billForm.updateValueAndValidity();
  }

  submit() {
    const bill = this.billForm.value;
    bill.amount = bill.amount.replace(',', '');

    if (bill.billing_type === 'contingency' && bill.settlement_date) {
      bill.settlement_date = bill.settlement_date.singleDate.jsDate;
    } else if (bill.billing_type === 'hourly' && bill.start_date && bill.end_date) {
      bill.start_date = bill.start_date.singleDate.jsDate;
      bill.end_date = bill.end_date.singleDate.jsDate;
    } else if (bill.billing_type === 'flat rate' && bill.date) {
      bill.date = bill.date.singleDate.jsDate;
    }

    this.close(bill);
  }

  close(data?: any) {
    this._dialogRef.close(data);
  }
}
