import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    this.bills = this.bills.filter(bill => bill.statement_id == this.statement.id);
    console.log(this.statement);
    console.log(this.bills);
  }



  //controls visibility
  toggleIsVisible() : void {
    this.isVisible = !this.isVisible;
    this.isVisibleChange.emit(this.isVisible);
  }

}
