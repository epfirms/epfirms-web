import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-payment-view',
  templateUrl: './monthly-payment-view.component.html',
  styleUrls: ['./monthly-payment-view.component.scss']
})
export class MonthlyPaymentViewComponent implements OnInit {

  @Input() customerAccount;

  additionalAmount : number = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

}
