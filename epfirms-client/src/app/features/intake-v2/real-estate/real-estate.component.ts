import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { createMask } from '@ngneat/input-mask';
import { FinancialSummaryService } from '../services/financial-summary.service';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss'],
})
export class RealEstateComponent implements OnInit {
  @Input() matter;
  @Input() client;

  financialSummaryForm = {
    id: undefined,
    user_id: undefined,
    primary_residence_address: '',
    primary_residence_value: '0',
    primary_residence_loan_amount: '0',
    property_1_address: '',
    property_1_value: '0',
    property_1_loan_amount: '0',
    property_2_address: '',
    property_2_value: '0',
    property_2_loan_amount: '0',

    property_3_address: '',
    property_3_value: '0',
    property_3_loan_amount: '0',

    property_4_address: '',
    property_4_value: '0',
    property_4_loan_amount: '0',
  };

  constructor(private financialSummaryService: FinancialSummaryService) {}

  ngOnInit(): void {
    this.load();
    this.financialSummaryForm.user_id = this.client.id;
  }

  // currency mask

  currencyInputMask = createMask({
    prefix: '$',
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
  });

  //load the financial summary
  // if no summary, upsert/init new one
  load(): void {
    this.financialSummaryService.getWithUserId(this.client.id).subscribe((res) => {
      if (res) {
        // check if there is a summary that is not joint for the client; else upsert
        if (res.filter((summary) => summary.is_joint === false).length > 0) {
          this.financialSummaryForm = this.parseResponse(
            res.filter((summary) => summary.is_joint === false)[0],
          );
          console.log('loaded summary', this.financialSummaryForm);
        } else {
          // init and upsert
          this.financialSummaryService
            .upsert({
              user_id: this.client.id,
              primary_residence_address: this.matter.client.address,
            })
            .subscribe((createdRes) => {
              console.log('created res', createdRes);
              this.financialSummaryForm = this.parseResponse(createdRes[0]);
            });
        }
      }
      console.log(res);
    });
  }

  // method that formats the string; removes '$' and ','
  private toStringFloat(value): string {
    let formatted = value.replace(/\$/g, '');
    formatted = formatted.replace(/,/g, '');

    return formatted;
  }

  private parseResponse(res): any {
    let form = {
      id: res.id,
      user_id: res.user_id,
      primary_residence_address: res.primary_residence_address,
      primary_residence_value: res.primary_residence_value.toString(),
      primary_residence_loan_amount: res.primary_residence_loan_amount.toString(),
      property_1_address: res.property_1_address,
      property_1_value: res.property_1_value.toString(),
      property_1_loan_amount: res.property_1_loan_amount.toString(),
      property_2_address: res.property_2_address,
      property_2_value: res.property_2_value.toString(),
      property_2_loan_amount: res.property_2_loan_amount.toString(),
      property_3_address: res.property_3_address,
      property_3_value: res.property_3_value.toString(),
      property_3_loan_amount: res.property_3_loan_amount.toString(),
      property_4_address: res.property_4_address,
      property_4_value: res.property_4_value.toString(),
      property_4_loan_amount: res.property_4_loan_amount.toString(),
    };
    return form;
  }

  private parseForm(): any {
    let form = {
      id: this.financialSummaryForm.id,
      user_id: this.financialSummaryForm.user_id,
      primary_residence_address: this.financialSummaryForm.primary_residence_address,
      primary_residence_value: parseFloat(
        this.toStringFloat(this.financialSummaryForm.primary_residence_value),
      ),
      primary_residence_loan_amount: parseFloat(
        this.toStringFloat(this.financialSummaryForm.primary_residence_loan_amount),
      ),
      property_1_address: this.financialSummaryForm.property_1_address,
      property_1_value: parseFloat(this.toStringFloat(this.financialSummaryForm.property_1_value)),
      property_1_loan_amount: parseFloat(
        this.toStringFloat(this.financialSummaryForm.property_1_loan_amount),
      ),
      property_2_address: this.financialSummaryForm.property_2_address,
      property_2_value: parseFloat(this.toStringFloat(this.financialSummaryForm.property_2_value)),
      property_2_loan_amount: parseFloat(
        this.toStringFloat(this.financialSummaryForm.property_2_loan_amount),
      ),
      property_3_address: this.financialSummaryForm.property_3_address,
      property_3_value: parseFloat(this.toStringFloat(this.financialSummaryForm.property_3_value)),
      property_3_loan_amount: parseFloat(
        this.toStringFloat(this.financialSummaryForm.property_3_loan_amount),
      ),
      property_4_address: this.financialSummaryForm.property_4_address,
      property_4_value: parseFloat(this.toStringFloat(this.financialSummaryForm.property_4_value)),
      property_4_loan_amount: parseFloat(
        this.toStringFloat(this.financialSummaryForm.property_4_loan_amount),
      ),
    };
    return form;
  }

  submit(): void {
    console.log('submitting', this.financialSummaryForm);
    this.financialSummaryService.upsert(this.parseForm()).subscribe((res) => {
      console.log('res', res);
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

  //formatted difference
  // this is for returning equity
  formattedEquity(value: string, loan: string): number {
    return parseFloat(this.toStringFloat(value)) - parseFloat(this.toStringFloat(loan));
  }

  // returns the non countable amount based on the limit for the state
  // it would be good to have those limits grabbed from somewhere and stored
  // as they vary state by state by year
  formattedNonCountable(value: string, loan: string, limit: number): number {
    let equity = this.formattedEquity(value, loan);
    if (equity > limit) {
      return limit;
    } else {
      return equity;
    }
  }

  // returns the countable amount based on the limit for the state
  formattedCountable(value: string, loan: string, limit: number): number {
    let equity = this.formattedEquity(value, loan);
    if (equity > limit) {
      return equity - limit;
    } else {
      return 0;
    }
  }

}
