import { Component, OnInit } from '@angular/core';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-billing-setup',
  templateUrl: './billing-setup.component.html',
  styleUrls: ['./billing-setup.component.scss']
})
export class BillingSetupComponent implements OnInit {

  billingType : string;
  splitPayment : boolean = false;

  // currency mask

  currencyInputMask = createMask({
    prefix: '$',
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
  });
  constructor() { }

  ngOnInit(): void {
  }

}
