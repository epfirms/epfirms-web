import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';

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
    'activity',
    'statements',
    'monthly payments',
  ];
  selectedTab: any = 'overview';

  balanceDue : number = 0;

  //payments on the case
  payments = [];
  lastPaymentAmount = 0;



  constructor(
    private matterService : MatterService
  ) { }

  ngOnInit(): void {
    this.calculateBalanceDue()
    this.loadPayments()
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
        console.log("res",res.filter(bill => bill.type == 1));
        console.log("payments", this.payments);
        this.lastPaymentAmount = this.payments[this.payments.length - 1].amount;
      });
  }

}
