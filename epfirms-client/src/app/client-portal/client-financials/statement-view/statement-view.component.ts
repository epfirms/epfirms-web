import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';

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

  constructor(
    private matterService : MatterService
  ) { }

  ngOnInit(): void {
    console.log(this.statements);
    this.loadBills();
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

}
