import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Matter } from '@app/core/interfaces/matter';

@Component({
  selector: 'app-monthly-payment',
  templateUrl: './monthly-payment.component.html',
  styleUrls: ['./monthly-payment.component.scss']
})
export class MonthlyPaymentComponent implements OnInit {
  // binding for matter
  @Input()
  get matter() {
    return this._matter;
  }
  set matter(value: Matter) {
    this._matter = value;
  }

  private _matter: Matter;
  // property for holding the value of the editable datepicker form
  dueDate;

  enableMonthlyPayments : boolean = false;

  //form group for monthly payment / customer account stuff
  customerAccountForm = new FormGroup({
    user_id: new FormControl(),
    matter_id: new FormControl(),
    payment_agreement: new FormControl(),
    min_payment: new FormControl(),
    due_date: new FormControl(),
    apply_late_fee: new FormControl(),
    grace_period: new FormControl(),
    late_fee_amount: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
  }

  toggleMonthlyPayments() : void {
    this.enableMonthlyPayments = !this.enableMonthlyPayments;
  }

}
