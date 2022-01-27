import { Component, Input, OnInit } from '@angular/core';
import { CustomerAccountService } from '@app/shared/_services/customer-account.service';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';

@Component({
  selector: 'app-monthly-payment-view',
  templateUrl: './monthly-payment-view.component.html',
  styleUrls: ['./monthly-payment-view.component.scss']
})
export class MonthlyPaymentViewComponent implements OnInit {

  @Input() customerAccount;

  additionalAmount : number = 0;

  constructor(
    private stripeService : StripeService,
    private customerAccountService : CustomerAccountService
  ) { }

  ngOnInit(): void {
  }


  createSubscriptionSession() : void {
    let paymentData = {
      balance: this.customerAccount.min_payment + this.additionalAmount,
    }
    this.stripeService.createSubscriptionSession(paymentData).subscribe(res => {
      // we receive the session url and the id
      let subscriptionId = res.session_id;
      let url = res.url;
      console.log("URL", url);
      console.log("RES", res);
      // we need to add the session id to the statement to verify payment
      // when the webhook sends back a request to the server on fufillment
      // ideally, we don't want to navigate to the new window until this session
      // has been saved as we don't ever want there to be a time when the session
      // id's do not match for some reason
        this.customerAccount.stripe_session_id = subscriptionId;
        this.customerAccountService.upsert(this.customerAccount).subscribe(onres => {
          console.log("UPSERTRES",onres);
          window.location.replace(url);
        });
      });
  }
}
