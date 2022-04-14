import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { IncomeService } from '@app/client-portal/_services/income-service/income.service';
import { Income } from '@app/core/interfaces/income';

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

  // properties for the  monthly income section
  monthlyIncome = [];
  j;

  // spouse property if available
  spouse;
  client;

  constructor(
    private familyMemberService: FamilyMemberService,
    private incomeService: IncomeService,
  ) {}

  ngOnInit(): void {
    this.loadSpouse();
    
    this.client = this.matter.client;
  }

  loadIncomes(): void {
    this.incomeService.getAllWithUserId(this.matter.client.id).subscribe((res) => {
      if (res.length !== 0) {
        this.monthlyIncome = this.monthlyIncome.concat(res);
      }
    });
    if (this.spouse) {
      this.includeSpouseIncome = true;
      this.incomeService.getAllWithUserId(this.spouse.id).subscribe((res) => {
        if (res.length !== 0) {
          this.monthlyIncome = this.monthlyIncome.concat(res);
        }
      });
    }
    
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
    this.monthlyIncome.push(income);
    
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
