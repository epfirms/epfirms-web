import { Component, OnInit } from '@angular/core';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';

@Component({
  selector: 'app-billing-overview',
  templateUrl: './billing-overview.component.html',
  styleUrls: ['./billing-overview.component.scss'],
})
export class BillingOverviewComponent implements OnInit {
  customer;

  constructor(private _stripeService: StripeService) {}

  ngOnInit() {
    this._stripeService.getCurrentCustomer().subscribe((response) => {
      this.customer = response.data.customer;
    });
  }
}
