import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';
import { StripeElementsOptions, StripePaymentElementOptions } from '@stripe/stripe-js';
import { StripePaymentElementComponent, StripeService as NgxStripeService } from 'ngx-stripe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-balance-save-payment-method',
  templateUrl: './balance-save-payment-method.component.html',
  styleUrls: ['./balance-save-payment-method.component.scss']
})
export class BalanceSavePaymentMethodComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;
  
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

  constructor(
    private _stripeService: StripeService,
    private ngxStripeService: NgxStripeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createSetupIntent().subscribe((response) => {
      console.log(response);
      this.elementsOptions.clientSecret = response.data.setupIntent.client_secret;
    });
  }

  submit() {
    this.ngxStripeService.confirmSetup({elements: this.paymentElement.elements, redirect: "if_required"}).subscribe((res) => {
      console.log(res);
    })
  }
  
  private createSetupIntent(): Observable<any> {
    return this._stripeService.createSetupIntent();
  }
}
