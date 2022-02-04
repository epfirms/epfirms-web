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
  @Input() matter;

  additionalAmount : number = 0;

  //the connected account is the stripe account id of the firm 
  // this is what will be used to transfer the funds to
  connectedAccount;

  constructor(
    private stripeService : StripeService,
    private customerAccountService : CustomerAccountService
  ) { }

  ngOnInit(): void {
    console.log("MATTER", this.matter);
    console.log("customeraccount", this.customerAccount);
    this.initConnectedAccount();
  }


  createSubscriptionSession() : void {
    console.log("ADDITIONAL AMOUNT",this.customerAccount.min_payment, this.additionalAmount);
    let paymentData = {
      balance: this.customerAccount.min_payment + this.additionalAmount,
      case_id: this.matter.case_id,
      due_date: this.customerAccount.due_date,
      connected_account: this.connectedAccount
    }
    // update the customer account object to have the active subscription amount
    this.customerAccount.active_payment_amount = paymentData.balance;
    this.customerAccount.due_date = new Date().getDate();
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


  initConnectedAccount() : void {
    this.stripeService.getConnectionStatus().subscribe(res => {
      console.log(res);
      this.connectedAccount = res.account.account_id;
    });
  }
}
