import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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


  constructor() { }

  ngOnInit(): void {
    this.calculateBalanceDue()
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

}
