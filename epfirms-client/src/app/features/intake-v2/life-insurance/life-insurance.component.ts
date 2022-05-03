import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';
import { createMask } from '@ngneat/input-mask';
import { FinancialSummaryService } from '../services/financial-summary.service';

@Component({
  selector: 'app-life-insurance',
  templateUrl: './life-insurance.component.html',
  styleUrls: ['./life-insurance.component.scss'],
})
export class LifeInsuranceComponent implements OnInit {
  @Input() matter: Matter;

  currencyInputMask = createMask({
    prefix: '$',
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
  });

  lifeInsuranceForm = {
    id: undefined,
    user_id: undefined,
    total_term_death_benefit: '0',
    total_term_cash_value: '0',
    total_term_surrender_value: '0',
    total_life_death_benefit: '0',
    total_life_cash_value: '0',
    total_life_surrender_value: '0',
    total_index_death_benefit: '0',
    total_index_cash_value: '0',
    total_index_surrender_value: '0',
    total_other_death_benefit: '0',
    total_other_cash_value: '0',
    total_other_surrender_value: '0',
  };

  constructor(private financialSummaryService: FinancialSummaryService) {}

  ngOnInit(): void {
    this.lifeInsuranceForm.user_id = this.matter.client.id;
    this.load();
  }

  //load the financial summary from the service
  private load(): void {
    this.financialSummaryService.getWithUserId(this.matter.client.id).subscribe((response) => {
      console.log("load res", response);
      if (response.length > 0) {

      this.parseResponse(response.filter(summary => !summary.is_joint)[0]);
      }
      else {
        this.upsert();
      }
    });
  }

  // method that formats the string; removes '$' and ','
  private toStringFloat(value): string {
    let formatted = value.replace(/\$/g, '');
    formatted = formatted.replace(/,/g, '');

    return formatted;
  }

  // method that parses the response from the server

  private parseResponse(response): void {
    this.lifeInsuranceForm.id = response.id;
    this.lifeInsuranceForm.user_id = response.user_id;
    this.lifeInsuranceForm.total_term_death_benefit = response.total_term_death_benefit.toString();
    this.lifeInsuranceForm.total_term_cash_value = response.total_term_cash_value.toString();
    this.lifeInsuranceForm.total_term_surrender_value =
      response.total_term_surrender_value.toString();
    this.lifeInsuranceForm.total_life_death_benefit = response.total_life_death_benefit.toString();
    this.lifeInsuranceForm.total_life_cash_value = response.total_life_cash_value.toString();
    this.lifeInsuranceForm.total_life_surrender_value =
      response.total_life_surrender_value.toString();
    this.lifeInsuranceForm.total_index_death_benefit =
      response.total_index_death_benefit.toString();
    this.lifeInsuranceForm.total_index_cash_value = response.total_index_cash_value.toString();
    this.lifeInsuranceForm.total_index_surrender_value =
      response.total_index_surrender_value.toString();
    this.lifeInsuranceForm.total_other_death_benefit =
      response.total_other_death_benefit.toString();
    this.lifeInsuranceForm.total_other_cash_value = response.total_other_cash_value.toString();
    this.lifeInsuranceForm.total_other_surrender_value =
      response.total_other_surrender_value.toString();
  }

  // method that parses the form data to be sent to server
  private parseFormData(): any {
    const formData = {
      id: this.lifeInsuranceForm.id,
      user_id: this.lifeInsuranceForm.user_id,
      total_term_death_benefit: this.toStringFloat(this.lifeInsuranceForm.total_term_death_benefit),
      total_term_cash_value: this.toStringFloat(this.lifeInsuranceForm.total_term_cash_value),
      total_term_surrender_value: this.toStringFloat(
        this.lifeInsuranceForm.total_term_surrender_value,
      ),
      total_life_death_benefit: this.toStringFloat(this.lifeInsuranceForm.total_life_death_benefit),
      total_life_cash_value: this.toStringFloat(this.lifeInsuranceForm.total_life_cash_value),
      total_life_surrender_value: this.toStringFloat(
        this.lifeInsuranceForm.total_life_surrender_value,
      ),
      total_index_death_benefit: this.toStringFloat(
        this.lifeInsuranceForm.total_index_death_benefit,
      ),
      total_index_cash_value: this.toStringFloat(this.lifeInsuranceForm.total_index_cash_value),
      total_index_surrender_value: this.toStringFloat(
        this.lifeInsuranceForm.total_index_surrender_value,
      ),
      total_other_death_benefit: this.toStringFloat(
        this.lifeInsuranceForm.total_other_death_benefit,
      ),
      total_other_cash_value: this.toStringFloat(this.lifeInsuranceForm.total_other_cash_value),
      total_other_surrender_value: this.toStringFloat(
        this.lifeInsuranceForm.total_other_surrender_value,
      ),
    };
    return formData;
  }

  upsert(): void {
    this.financialSummaryService.upsert(this.parseFormData()).subscribe((response) => {
      if (response.length > 0) {
        this.parseResponse(response.filter(summary => !summary.is_joint)[0]);
      }
      console.log(response);
    });
  }
//formatted sum: because the mask converts things to a string,
  // the frontend sums need a method that return a number
  // this makes use of the rest operator that provides a variable number of parameters
  // see typescript docs
  formattedSum(...n: string[]): number {
    let sum = 0;
    n.forEach((element) => {
      sum += parseFloat(this.toStringFloat(element));
    });
    return sum;
  }
}
