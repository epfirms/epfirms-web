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
    user_id: undefined,
    social_security: 0,
    pension: 0,
    work: 0,
    annuity: 0,
    other: 0,
    income_total: 0,
  };

  spouseIncomeForm: any = {
    user_id: undefined,
    social_security: 0,
    pension: 0,
    work: 0,
    annuity: 0,
    other: 0,
    income_total: 0,
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
  }

  loadSpouse(): void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe((res) => {
      this.spouse = res.filter((member) => member.family_member.relationship_type === 'spouse')[0];
      this.includeSpouseIncome = true;

      console.log("SPOUSE", this.spouse);
      this.spouseIncomeForm.user_id = this.spouse.id;
    });
  }

  upsertFinancialSummary(): void {
    console.log(this.clientIncomeForm);
    if (this.spouse) {
      console.log(this.spouseIncomeForm);
    }
    this.financialSummaryService.upsert(this.clientIncomeForm).subscribe((res) => {
      console.log(res);
    });
    if (this.spouse) {
      this.financialSummaryService.upsert(this.spouseIncomeForm).subscribe((res) => {
        console.log(res);
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
