import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    'class': ''
  }
})
export class AppComponent implements OnInit {


  constructor(private fb: FormBuilder, private stripeService: StripeService) {}

  ngOnInit(): void {
  }

  createToken(): void {

  }
}
