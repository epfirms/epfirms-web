import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-statement',
  templateUrl: './generate-statement.component.html',
  styleUrls: ['./generate-statement.component.scss']
})
export class GenerateStatementComponent implements OnInit {

  //bills that are associated with the statement
  @Input() bills : any[];
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.bills);
  }

  toggleCheckbox(bill):void {
    bill.reconciled = !bill.reconciled;
    console.log(bill);
    console.log(this.bills);
  }

}
