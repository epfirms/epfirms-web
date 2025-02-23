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

  @Input() client;

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
    business_income: '0',
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
    business_income: '0',
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

  constructor(
    private familyMemberService: FamilyMemberService,
    private financialSummaryService: FinancialSummaryService,
  ) {}

  ngOnInit(): void {
    this.clientIncomeForm.user_id = this.client.id;
    this.loadSpouse();

    this.loadClientFinancialSummary();
  }

  loadSpouse(): void {
    this.familyMemberService.getByUserId(this.client.id).subscribe((res) => {
      if (res) {
        this.spouse = res.filter(
          (member) => member.family_member.relationship_type === 'spouse',
        )[0];
        if (this.spouse) {
          
        this.includeSpouseIncome = true;
        this.spouseIncomeForm.user_id = this.spouse.id;
          this.loadSpouseFinancialSummary();
        }

      }
    });
  }

  private loadClientFinancialSummary(): void {
    this.financialSummaryService.getWithUserId(this.client.id).subscribe((res) => {
      if (res) {
        this.clientIncomeForm = this.parseResponse(res[0]);
      }
    });
  }

  private loadSpouseFinancialSummary(): void {
    this.financialSummaryService.getWithUserId(this.spouse.id).subscribe((res) => {
      if (res) {
        this.spouseIncomeForm = this.parseResponse(res[0]);
      }
    });
  }

  //return the financial summary but parsed floats
  private parseIncomeForm(incomeForm): any {
    const income = {
      id: incomeForm.id,
      user_id: incomeForm.user_id,
      social_security: parseFloat(this.toStringFloat(incomeForm.social_security)),
      pension: parseFloat(this.toStringFloat(incomeForm.pension)),
      work: parseFloat(this.toStringFloat(incomeForm.work)),
      annuity: parseFloat(this.toStringFloat(incomeForm.annuity)),
      other: parseFloat(this.toStringFloat(incomeForm.other)),
      income_total: parseFloat(this.toStringFloat(incomeForm.income_total)),
      business_income: parseFloat(this.toStringFloat(incomeForm.business_income)),
    };
    income.income_total =
      income.social_security + income.pension + income.work + income.annuity + income.other;
    return income;
  }

  // method that formats the string; removes '$' and ','
  private toStringFloat(value): string {
    let formatted = value.replace(/\$/g, '');
    formatted = formatted.replace(/,/g, '');

    return formatted;
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
      business_income: response.business_income.toString(),
    };
    return income;
  }

  upsertFinancialSummary(): void {
    this.financialSummaryService
      .upsert(this.parseIncomeForm(this.clientIncomeForm))
      .subscribe((res) => {
        if (res) {
          this.clientIncomeForm = this.parseResponse(res[0]);
        }
      });
    if (this.spouse) {
      this.financialSummaryService
        .upsert(this.parseIncomeForm(this.spouseIncomeForm))
        .subscribe((res) => {
          if (res) {
            this.spouseIncomeForm = this.parseResponse(res[0]);
          }
        });
    }
  }

  
}
