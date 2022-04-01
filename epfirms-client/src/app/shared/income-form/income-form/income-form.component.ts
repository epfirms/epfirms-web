import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IncomeService } from '@app/client-portal/_services/income-service/income.service';
import { FormSettings } from '@app/core/interfaces/FormSettings';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
})
export class IncomeFormComponent implements OnInit {
  // Input bindings
  @Input() income;
  @Input() formSettings: FormSettings;
  @Input() matter;
  // bindings that control state of dropdown
  dropdownVisible: boolean = false;

  //binding for the title at top of card
  title: string = 'TITLE GOES HERE';
  //binding for the subtitle below the title
  subtitle: string = 'SUBTITLE GOES HERE';

  // relationship types
  incomeTypes = ['payroll', 'pension', 'social security', 'alimony', 'other', 'retirement'];

  // form group for the user information and to create family member relationship
  incomeForm = new FormGroup({
    id: new FormControl(),
    user_id: new FormControl(),
    type: new FormControl(),
    amount: new FormControl(),
  });
  constructor(
    private incomeService: IncomeService,
  ) {}

  ngOnInit(): void {
    this.loadFormSettings();
    this.patchIncomeForm();
  }

  // loads the form settings from the input
  private loadFormSettings(): void {
    this.title = this.formSettings.title;
    this.subtitle = this.formSettings.subtitle;
  }

  // patch the user profile form with the user profile
  private patchIncomeForm(): void {
    this.incomeForm.patchValue({
      id: this.income.id,
      user_id: this.income.user_id,
      type: this.income.type,
      amount: this.income.amount,
    });
  }

  // method that toggles the visiblity of the dropdown
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  submit(): void {
    // submit the income
    this.incomeService.upsert(this.incomeForm.value).subscribe();
    this.subtitle = this.incomeForm.value.type;
    this.toggleDropdown();
  }
}
