import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { IncomeService } from '@app/client-portal/_services/income-service/income.service';
import { Income } from '@app/core/interfaces/income';
import { createMask } from '@ngneat/input-mask';
import { FinancialSummaryService } from '../services/financial-summary.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
})
export class IncomeComponent implements OnInit {
  @Input() matter;
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();

  // states for the financials section
  includeSpouseIncome: boolean = false;

  clientIncomeForm: any = {
    id: undefined,
    user_id: undefined,
    social_security: '0',
    pension: '0',
    work: '0',
    annuity: '0',
    other: '0',
    income_total: '0',
  };

  spouseIncomeForm: any = {
    id: undefined,
    user_id: undefined,
    social_security: '0',
    pension: '0',
    work: '0',
    annuity: '0',
    other: '0',
    income_total: '0',
  };

  currencyInputMask = createMask({
    prefix: '$',
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
  });

  // spouse property if available
  spouse;
  client;

  constructor(
    private familyMemberService: FamilyMemberService,
    private financialSummaryService: FinancialSummaryService,
  ) {}

  ngOnInit(): void {

    this.client = this.matter.client;
    this.clientIncomeForm.user_id = this.client.id;
    this.loadSpouse();
    
    this.loadClientFinancialSummary();
  }

  loadSpouse(): void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe((res) => {
      this.spouse = res.filter((member) => member.family_member.relationship_type === 'spouse')[0];
      this.includeSpouseIncome = true;
      if (this.spouse) {
       this.loadSpouseFinancialSummary(); 
      }

      console.log("SPOUSE", this.spouse);
      this.spouseIncomeForm.user_id = this.spouse.id;
    });
  }

  private loadClientFinancialSummary(): void {
    this.financialSummaryService.getWithUserId(this.client.id).subscribe((res) => {
      console.log("load client financial summary", res);
      this.clientIncomeForm = this.parseResponse(res[0]);
    });
  }

  private loadSpouseFinancialSummary(): void {
    this.financialSummaryService.getWithUserId(this.spouse.id).subscribe((res) => {
      
      console.log("load spouse financial summary", res);
      this.spouseIncomeForm = this.parseResponse(res[0]);
    });
  }

  //return the financial summary but parsed floats
  private parseIncomeForm(incomeForm): any {
    const income = {
      id: incomeForm.id,
      user_id: incomeForm.user_id,
      social_security: parseFloat(this.removeDollarSign(incomeForm.social_security)),
      pension: parseFloat(this.removeDollarSign(incomeForm.pension)),
      work: parseFloat(this.removeDollarSign(incomeForm.work)),
      annuity: parseFloat(this.removeDollarSign(incomeForm.annuity)),
      other: parseFloat(this.removeDollarSign(incomeForm.other)),
      income_total: parseFloat(this.removeDollarSign(incomeForm.income_total)),
    };
    income.income_total = income.social_security + income.pension + income.work + income.annuity + income.other;
    return income;
  }

  // method that removes "$" from the input
private  removeDollarSign(value): string {
    return value.replace('$', '');
  }


  // parse the response into strings
  private parseResponse(response): any {
    const income = {
      id: response.id,
      user_id: response.user_id,
      social_security: response.social_security.toString(),
      pension: response.pension.toString(),
      work: response.work.toString(),
      annuity: response.annuity.toString(),
      other: response.other.toString(),
      income_total: response.income_total.toString(),
    };
    return income;
  }






  upsertFinancialSummary(): void {
    console.log(this.clientIncomeForm);
    if (this.spouse) {
      console.log(this.spouseIncomeForm);
    }
    this.financialSummaryService.upsert(this.parseIncomeForm(this.clientIncomeForm)).subscribe((res) => {
      console.log(res);
      this.clientIncomeForm = this.parseResponse(res[0]);
      console.log("form after response", this.clientIncomeForm);
    });
    if (this.spouse) {
      this.financialSummaryService.upsert(this.parseIncomeForm(this.spouseIncomeForm)).subscribe((res) => {
        console.log(res);
        this.spouseIncomeForm = this.parseResponse(res[0]);
        console.log("form after res", this.spouseIncomeForm);
      });
    }
  }

  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }
}
