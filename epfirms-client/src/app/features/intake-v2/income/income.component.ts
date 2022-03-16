import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMemberService } from '@app/client-portal/_services/family-member-service/family-member.service';
import { Income } from '@app/core/interfaces/income';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  @Input() matter;
  @Output() back = new EventEmitter<boolean>();
  @Output() continue = new EventEmitter<boolean>();

  // states for the financials section
  includeSpouseIncome : boolean = false;

  // properties for the  monthly income section
  monthlyIncome : Income[] = [];

  // spouse property if available
  spouse;


  constructor(
    private familyMemberService : FamilyMemberService,
  ) { }

  ngOnInit(): void {
  this.loadSpouse();
  }

 loadSpouse() : void {
    this.familyMemberService.getByUserId(this.matter.client.id).subscribe(res => {
      console.log(res);
      this.spouse = res.filter((member) => member.family_member.relationship_type === "spouse")[0];
      console.log("spouse", this.spouse);
    });
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

  backButton() : void {
    this.back.emit(true);
  }

  continueButton() : void {
    this.continue.emit(true);
  }

}
