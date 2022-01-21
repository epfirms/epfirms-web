import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Matter } from '@app/core/interfaces/matter';
import { CustomerAccountService } from '@app/shared/_services/customer-account.service';

@Component({
  selector: 'app-monthly-payment',
  templateUrl: './monthly-payment.component.html',
  styleUrls: ['./monthly-payment.component.scss'],
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

  enableMonthlyPayments: boolean = false;

  //form group for monthly payment / customer account stuff
  customerAccountForm = new FormGroup({
    user_id: new FormControl(),
    matter_id: new FormControl(),
    firm_id: new FormControl(),
    payment_agreement: new FormControl(),
    min_payment: new FormControl(),
    due_date: new FormControl(),
    apply_late_fee: new FormControl(),
    grace_period: new FormControl(),
    late_fee_amount: new FormControl(),
  });

  constructor(private customerAccountService: CustomerAccountService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCustomerAccount();
  }

  toggleMonthlyPayments(): void {
    this.enableMonthlyPayments = !this.enableMonthlyPayments;
    this.customerAccountForm.patchValue({ payment_agreement: this.enableMonthlyPayments });
  }

  submit(): void {
    this.customerAccountService
      .upsert(this.customerAccountForm.value)
      .subscribe((res) => console.log(res));
  }

  initForm(): void {
    this.customerAccountForm.patchValue({
      user_id: this.matter.client.id,
      matter_id: this.matter.id,
      firm_id: this.matter.firm_id,
    });
  }

  loadCustomerAccount(): void {
    this.customerAccountService.get(this.matter.id).subscribe((res) => {
      this.enableMonthlyPayments = res.payment_agreement;
      this.customerAccountForm.patchValue({
        payment_agreement: res.payment_agreement,
        due_date: res.due_date,
        min_payment: res.min_payment,
      });
    });
  }
}
