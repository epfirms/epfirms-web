import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generate-statement',
  templateUrl: './generate-statement.component.html',
  styleUrls: ['./generate-statement.component.scss']
})
export class GenerateStatementComponent implements OnInit {

  //bills that are associated with the statement
  @Input() bills : any[];

  @Input() state: boolean;
  @Output() stateChanged = new EventEmitter<boolean>();

  //properties for the new statement
  statementTotal : number = 0;
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.bills);
  }

  toggleCheckbox(bill):void {
    bill.reconciled = !bill.reconciled;
    if (bill.reconciled) {
      this.statementTotal += bill.amount;
    }
    else {
      this.statementTotal -= bill.amount;
    }
    console.log(bill);
    console.log(this.bills);
  }

  close() : void {
    this.state = !this.state;
    this.stateChanged.emit(false);
  }

}
