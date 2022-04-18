import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { IncomeService } from '@app/client-portal/_services/income-service/income.service';
import { Income } from '@app/core/interfaces/income';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
})
export class IncomeComponent implements OnInit {
  @Input() matter;
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();

  incomeTypes = ['work', 'pension', 'social security', 'other', 'annuity'];

  // states for the financials section
  includeSpouseIncome: boolean = false;

  // properties for the  monthly income section
  monthlyIncomeItems = [];
  j;

  currencyInputMask = createMask({
    prefix: '$',
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
  });

  clientIncomeItems: {
    socialSecurity;
    pension;
    work;
    annuity;
    other;
  } = this.initDefaultIncome();

  spouseIncomeItems: {
    socialSecurity;
    pension;
    work;
    annuity;
    other;
  } = this.initDefaultIncome();

  // spouse property if available
  spouse;
  client;

  constructor(
    private familyMemberService: FamilyMemberService,
    private incomeService: IncomeService,
  ) { }

  ngOnInit(): void {
    this.loadSpouse();

    this.client = this.matter.client;
  }

  loadIncomes(): void {
    this.incomeService.getAllWithUserId(this.matter.client.id).subscribe((res) => {
      if (res.length !== 0) {
        this.monthlyIncomeItems = this.monthlyIncomeItems.concat(res);
        const initial = this.initDefaultIncome();
        this.clientIncomeItems = res.reduce((acc, curr) => {
          switch (curr.type) {
            case 'social security':
              acc.socialSecurity = curr;
              break;
            case 'work':
              acc.work = curr;
              break;
            case 'annuity':
              acc.annuity = curr;
              break;
            case 'other':
              acc.other = curr;
              break;
            case 'pension':
              acc.pension = curr;
              break;
          }

          return acc;
        }, initial);
      }
    });
    if (this.spouse) {
      this.includeSpouseIncome = true;
      this.incomeService.getAllWithUserId(this.spouse.id).subscribe((res) => {
        if (res.length !== 0) {
          const initial = this.initDefaultIncome();

          this.spouseIncomeItems = res.reduce((acc, curr) => {
            switch (curr.type) {
              case 'social security':
                acc.socialSecurity = curr;
                break;
              case 'work':
                acc.work = curr;
                break;
              case 'annuity':
                acc.annuity = curr;
                break;
              case 'other':
                acc.other = curr;
                break;
              case 'pension':
                acc.pension = curr;
                break;
            }

            return acc;
          }, initial);
        }
      });
    }
  }

  initDefaultIncome() {
    return {
      socialSecurity: {
        amount: 0,
        type: 'social security'
      },
      pension: {
        amount: 0,
        type: 'pension'
      },
      work: {
        amount: 0,
        type: 'work'
      },
      other: {
        amount: 0,
        type: 'other'
      },
      annuity: {
        amount: 0,
        type: 'annuity'
      }
    }
  }

  saveChange(incomeItem, changes) {
    console.log(changes)
    this.incomeService.upsert({ ...incomeItem, ...changes }).subscribe((response) => {
      const index = this.monthlyIncomeItems.findIndex(item => item.id === response[0].id);
      this.monthlyIncomeItems[index] = response[0];
    });
  }

  loadSpouse(): void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe((res) => {

      this.spouse = res.filter((member) => member.family_member.relationship_type === 'spouse')[0];

      this.loadIncomes();
    });
  }

  addIncome(isSpouseIncome: boolean): void {

    let income = {
      type: 'Payroll',
      amount: 0,
      user_id: isSpouseIncome ? this.spouse.id : this.matter.client.id,
    };
    this.monthlyIncomeItems.push(income);

  }

  onIncomeChange(income: string, incomeBinding): void {
    incomeBinding.amount = parseFloat(income);
  }

  backButton(): void {
    this.back.emit(true);
  }

  continueButton(): void {
    this.continue.emit(true);
  }

  submit(): void {

    this.continueButton();
  }
}
