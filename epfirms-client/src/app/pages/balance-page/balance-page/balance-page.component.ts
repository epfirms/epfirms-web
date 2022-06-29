import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BalanceAddFundsComponent } from '@app/features/balance/balance-add-funds/balance-add-funds.component';
import { EpModalService } from '@app/shared/modal/modal.service';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';
import { createMask } from '@ngneat/input-mask';
import { pluck, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-balance-page',
  templateUrl: './balance-page.component.html',
  styleUrls: ['./balance-page.component.scss'],
})
export class BalancePageComponent implements OnInit {
  customer;

  paymentMethods;

  currencyMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 0,
    digitsOptional: false,
    placeholder: '0',
    onBeforeMask: (initialValue) => {
      return this.convertCentsToDollars(parseInt(initialValue)).toString();
    },
  });

  autoRechargeMetadata = this.fb.group({
    auto_recharge: ['', [Validators.required]],
    auto_recharge_amount: [5000, [Validators.required, Validators.pattern(/\d+/)]],
    auto_recharge_trigger: [0, [Validators.required, Validators.pattern(/\d+/)]],
    auto_recharge_payment_method: ['', [Validators.required]],
  });

  constructor(
    private _stripeService: StripeService,
    private _modalService: EpModalService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.getStripeCustomer().subscribe();
  }

  convertCentsToDollars(amount: number): number {
    return Math.floor(amount / 100);
  }

  getStripeCustomer() {
    return this._stripeService.getCurrentCustomer().pipe(
      tap((response) => {
        this.customer = response.data.customer;
        this.autoRechargeMetadata.patchValue(response.data.customer.metadata);
      }),
      pluck('data', 'customer', 'id'),
      switchMap((id) => this._stripeService.getPaymentMethods(id)),
      tap((response) => {
        this.paymentMethods = response.data;
      }),
    );
  }

  addFundsModal() {
    this._modalService.create({
      epContent: BalanceAddFundsComponent,
      epComponentParams: {
        customerId: this.customer.id,
      },
      epOkText: 'Add funds',
      epCancelText: 'Cancel',
      epMaxWidth: '36rem',
      epAutofocus: null,
      epOnOk: (componentInstance) => {
        if (componentInstance.stripeTest.valid) {
          componentInstance.paying = true;
          componentInstance.ngxStripeService
            .confirmPayment({
              elements: componentInstance.paymentElement.elements,
              confirmParams: {
                payment_method_data: {
                  billing_details: {
                    name: componentInstance.stripeTest.get('name').value,
                  },
                },
              },
              redirect: 'if_required',
            })
            .subscribe((result) => {
              componentInstance.paying = false;
              console.log('Result', result);
              if (result.error) {
                // Show error to your customer (e.g., insufficient funds)
                alert({ success: false, error: result.error.message });
              } else {
                // The payment has been processed!
                if (result.paymentIntent.status === 'succeeded') {
                  componentInstance._stripeService
                    .updateCreditBalance(this.customer.id, result.paymentIntent.amount)
                    .subscribe((response) => {
                      // Show a success message to your customer
                      this.getStripeCustomer().subscribe();
                    });
                }
              }
            });
        } else {
          console.log(componentInstance.stripeTest);
        }
      },
    });
  }

  toggleAutoReload() {
    const currentValue = this.autoRechargeMetadata.get('auto_recharge').value;
    this.autoRechargeMetadata.get('auto_recharge').setValue(!currentValue);
    this.autoRechargeMetadata.updateValueAndValidity();

    this.saveAutoRecharge();
  }

  saveAutoRecharge() {
    this._stripeService
      .updateCustomer(this.customer.id, { metadata: this.autoRechargeMetadata.value })
      .subscribe();
  }

  setAmount(property: 'auto_recharge_amount' | 'auto_recharge_trigger', dollarAmount: string) {
    const centsAmount = parseInt(dollarAmount) * 100;
    this.autoRechargeMetadata.get(property).setValue(centsAmount);
    this.autoRechargeMetadata.updateValueAndValidity();
  }

  setDefaultPaymentMethod(id: string) {
    this._stripeService.updateCustomer(this.customer.id, { default_source: id }).subscribe();
  }
}
