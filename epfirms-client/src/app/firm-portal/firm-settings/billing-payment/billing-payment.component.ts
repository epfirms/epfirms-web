import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';
import { StripeElementsOptions, StripePaymentElementOptions } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { StripePaymentElementComponent, StripeService as NgxStripeService } from 'ngx-stripe';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-billing-payment',
  templateUrl: './billing-payment.component.html',
  styleUrls: ['./billing-payment.component.scss']
})
export class BillingPaymentComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;
  
  stripeTest = this.fb.group({
    name: ['', [Validators.required]],
    amount: [2000, [Validators.required, Validators.pattern(/\d+/)]],
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
          fontSmoothing: 'antialiased',
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
          fontSmoothing: 'antialiased',
        },
      },
    },
    locale: 'en',
  };
  
  options: StripePaymentElementOptions = {};

  paying = false;

  customerId;

  constructor(
    private fb: FormBuilder,
    private _stripeService: StripeService,
    private ngxStripeService: NgxStripeService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.customerId = params['customer'];
    });
  }

  ngOnInit(): void {
    this.createPaymentIntent(this.stripeTest.get('amount').value).subscribe((response) => {
      console.log(response);
      this.elementsOptions.clientSecret = response.data.paymentIntent.client_secret;
    });
  }

  convertCentsToDollars(amount: number): number {
    return Math.floor(amount / 100);
  }

  pay() {
    if (this.stripeTest.valid) {
      this.paying = true;
      this.ngxStripeService
        .confirmPayment({
          elements: this.paymentElement.elements,
          confirmParams: {
            payment_method_data: {
              billing_details: {
                name: this.stripeTest.get('name').value,
              },
            },
          },
          redirect: 'if_required',
        })
        .subscribe((result) => {
          this.paying = false;
          console.log('Result', result);
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            alert({ success: false, error: result.error.message });
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              this._stripeService
                .updateCreditBalance(this.customerId, result.paymentIntent.amount)
                .subscribe((response) => {
                  // Show a success message to your customer
                  alert({ response });
                });
            }
          }
        });
    } else {
      console.log(this.stripeTest);
    }
  }

  private createPaymentIntent(amount: number): Observable<any> {
    return this._stripeService.createPaymentIntent(amount);
  }
}
