import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { StatementService } from '@app/shared/_services/statement-service/statement.service';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';

@Component({
  selector: 'app-statement-view',
  templateUrl: './statement-view.component.html',
  styleUrls: ['./statement-view.component.scss']
})
export class StatementViewComponent implements OnInit {

  @Input() statements;
  @Input() isVisible : boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  //dictionary that will hold the bills based on statement id
  // key => value will be matter_id => array of bills
  statementBill = {};

  //connected account_id of the firm
  connectedAccout;

  constructor(
    private matterService : MatterService,
    private stripeService : StripeService,
    private statementService : StatementService
  ) { }

  ngOnInit(): void {
    console.log(this.statements);
    this.loadBills();
    this.stripeService.getConnectionStatus().subscribe(res => {
      this.connectedAccout = res.account.account_id;
    });
  }

  close() : void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  loadBills() : void {
    this.statements.forEach(statement => {
      this.matterService.getMatterBillingById(statement.matter_id).subscribe(res => {
        // get all of the reconciled bills associated with that statement_id
        this.statementBill[statement.matter_id] = res.filter(bill => bill.type == 0 && bill.reconciled);
        console.log(this.statementBill);
      });
    });
  }

  createPaymentSession(statement) : void {
    let paymentData = {
      balance: statement.balance_due,
      connected_account: this.connectedAccout
    }
    this.stripeService.createPaymentSession(paymentData).subscribe(res => {
      // we receive the session url and the id
      let sessionId = res.session_id;
      let url = res.url;
      console.log("URL", url);
      // we need to add the session id to the statement to verify payment
      // when the webhook sends back a request to the server on fufillment
      // ideally, we don't want to navigate to the new window until this session
      // has been saved as we don't ever want there to be a time when the session
      // id's do not match for some reason
      statement.stripe_session_id = sessionId;
        this.statementService.update(statement).subscribe(res => {
          // only change the window after the last statement has been updated
          window.location.replace(url);
        });
      });
  }
}
