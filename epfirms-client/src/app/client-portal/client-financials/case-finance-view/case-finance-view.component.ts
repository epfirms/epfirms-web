import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { CustomerAccountService } from '@app/shared/_services/customer-account.service';

@Component({
  selector: 'app-case-finance-view',
  templateUrl: './case-finance-view.component.html',
  styleUrls: ['./case-finance-view.component.scss']
})
export class CaseFinanceViewComponent implements OnInit {
  @Input() statements;
  @Input() isVisible : boolean;
  @Input() matter;
  @Output() isVisibleChange = new EventEmitter<boolean>();


  subTabs: string[] = [
    'transactions',
    'statements',
  ];
  selectedTab: any = 'transactions';

  balanceDue : number = 0;

  //payments on the case
  payments = [];
  lastPaymentAmount = 0;
  totalPayments = 0;
  //customer account
  // the custome account object contains details that are determined when
  // a firm sets up monthly payments for the client. This enables the 
  // visability of the monthly payments tab
  customerAccount;
  displayMonthlyPaymentTab : boolean = false;



  constructor(
    private matterService : MatterService,
    private customerAccountService : CustomerAccountService
  ) { }

  ngOnInit(): void {
    this.calculateBalanceDue();
    this.loadPayments();
    this.loadCustomerAccount();
  }

  selectTab(tab): void {
    console.log('before', this.selectedTab);
    this.selectedTab = tab;
    console.log('after', this.selectedTab);
  }

  // this calculates the balance due for each matter/case
  private calculateBalanceDue() : void {
    
    this.statements.forEach(statement => {
      
      if (statement.status === "UNPAID") {
        this.balanceDue += statement.balance_due;
      }
    });
    
  }

  private loadPayments() : void {
      this.matterService.getMatterBillingById(this.matter.id).subscribe(res => {
        // get all of the reconciled bills associated with that statement_id
        this.payments = res.filter(bill => bill.type == 1);
        this.payments.forEach(payment => {
          this.totalPayments += payment.amount;
        });
        console.log("res",res.filter(bill => bill.type == 1));
        console.log("payments", this.payments);
        this.lastPaymentAmount = this.payments[this.payments.length - 1].amount;
      });
  }

  private loadCustomerAccount() : void {
    this.customerAccountService.get(this.matter.id).subscribe(res => {
      this.customerAccount = res;
      this.displayMonthlyPaymentTab = res.payment_agreement;
      console.log("Customer Account", res);
    });
  }

}
