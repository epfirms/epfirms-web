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
    this.bills = this.bills.filter(bill => new Date().getMonth() === new Date(bill.date).getMonth());
    console.log(this.statement);
    console.log(this.bills);
  }



  //controls visibility
  toggleIsVisible() : void {
    this.isVisible = !this.isVisible;
    this.isVisibleChange.emit(this.isVisible);
  }

}
