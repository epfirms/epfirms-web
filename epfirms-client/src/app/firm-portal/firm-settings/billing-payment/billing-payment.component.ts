import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';
import { StripeElementsOptions, StripePaymentElementOptions } from '@stripe/stripe-js';
import { debounceTime, Observable } from 'rxjs';
import { StripePaymentElementComponent, StripeService as NgxStripeService } from 'ngx-stripe';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { EpModalRef } from '@app/shared/modal/modal-ref';

@Component({
  selector: 'app-billing-payment',
  templateUrl: './billing-payment.component.html',
  styleUrls: ['./billing-payment.component.scss']
})
export class BillingPaymentComponent implements OnInit {
  @Input() customerId: string;

  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;
  
  stripeTest = this.fb.group({
    name: ['', [Validators.required]],
    amount: [5000, [Validators.required, Validators.pattern(/\d+/)]],
  });

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

  elementsOptions: StripeElementsOptions = {
    fonts: [
      {
        cssSrc: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap`,
      },
    ],
    appearance: {
      theme: 'none',
      variables: {
        colorPrimary: '#3b82f6',
        fontFamily: '"Inter", sans-serif',
      },
      rules: {
        '.Input': {
          fontSize: '.875rem',
          lineHeight: '1.25rem',
          boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(0,0,0, 0.05)',
          border: '1px solid rgba(209, 213, 219, 1)',
          borderRadius: '0.375rem',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          paddingLeft: '0.75rem',
          paddingRight: '0.75rem',
          backgroundColor: '#fff',
          fontWeight: '400',
          color: 'rgb(0, 0, 0)',
        },
        '.Label': {
          color: 'rgb(55, 65, 81)',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          fontWeight: '500',
        },
      },
    },
    locale: 'en',
  };
  
  options: StripePaymentElementOptions = {};

  paying = false;

  isCustomAmount: boolean = false;

  constructor(
    private fb: FormBuilder,
    public _stripeService: StripeService,
    public ngxStripeService: NgxStripeService,
    private route: ActivatedRoute,
    private _modalRef: EpModalRef
  ) {}

  ngOnInit(): void {
    this.createPaymentIntent(this.stripeTest.get('amount').value).subscribe((response) => {
      this.elementsOptions.clientSecret = response.data.paymentIntent.client_secret;
      this.stripeTest.get('amount').valueChanges.pipe(debounceTime(750)).subscribe((val) => {
        this._stripeService.updatePaymentIntent(response.data.paymentIntent.id, val).subscribe(r => {console.log(r)})
      })
    });
  }

  convertCentsToDollars(amount: number): number {
    return Math.floor(amount / 100);
  }

  setAmount(dollarAmount: string) {
    const centsAmount = parseInt(dollarAmount) * 100;
    this.stripeTest.get('amount').setValue(centsAmount);
    this.stripeTest.updateValueAndValidity();
  }

  toggleCustomAmount() {
    this.isCustomAmount = true;
  }

  private createPaymentIntent(amount: number): Observable<any> {
    return this._stripeService.createPaymentIntent(amount);
  }
}
