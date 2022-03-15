import { Component, OnInit } from '@angular/core';
import { Income } from '@app/core/interfaces/income';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  // states for the financials section
  includeSpouseIncome : boolean = false;

  // properties for the  monthly income section
  monthlyIncome : Income[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  
  addIncome(isSpouseIncome : boolean) : void {
    console.log("ADDING INCOME FOR SPOUSE", isSpouseIncome);
    this.monthlyIncome.push({
      type : "Payroll",
      is_spouse_income : isSpouseIncome,
      amount : 0,
    });
  }

  onIncomeChange(income : string, incomeBinding) : void {
    incomeBinding.amount = parseFloat(income);
  }



}
