import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';

@Component({
  selector: 'app-manage-statement',
  templateUrl: './manage-statement.component.html',
  styleUrls: ['./manage-statement.component.scss']
})
export class ManageStatementComponent implements OnInit {

  //two way binding for visibility
  @Input() isVisible : boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Input() bills;
  @Input() statement;

  constructor(
    private matterService : MatterService,
  ) { }

  ngOnInit(): void {
    this.loadBills();
    console.log(this.statement);
    console.log(this.bills);
  }



  //controls visibility
  toggleIsVisible() : void {
    this.isVisible = !this.isVisible;
    this.isVisibleChange.emit(this.isVisible);
  }

  removeBill(bill) : void {
    bill.statement_id = -1;
    this.matterService.editMatterBillOrPayment(bill).subscribe(res => {
      console.log(res);
      this.loadBills();
    });
  }

  loadBills(): void {
    this.bills = this.bills.filter(bill => bill.statement_id == this.statement.id);
    this.calcBalanceDue();
  }

  calcBalanceDue() : void {
    this.statement.balance_due = 0;
    this.bills.forEach(bill => this.statement.balance_due += parseFloat(bill.amount));
  }

}
