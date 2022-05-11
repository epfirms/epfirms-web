import { Component, Input, OnInit } from '@angular/core';
import { Decedent } from '@app/core/interfaces/Decedent';
import { DecedentProperty } from '@app/core/interfaces/DecedentProperty';
import { Matter } from '@app/core/interfaces/matter';
import { UserService } from '@app/features/user/services/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { createMask } from '@ngneat/input-mask';
import { DecedentPropertyService } from '../services/decedent-property.service';
import { DecedentService } from '../services/decedent.service';
import { FinancialSummaryService } from '../services/financial-summary.service';

@Component({
  selector: 'app-decedent-property',
  templateUrl: './decedent-property.component.html',
  styleUrls: ['./decedent-property.component.scss'],
})
export class DecedentPropertyComponent implements OnInit {
  //Input bindings
  @Input() matter: Matter;

  // get the decedent user profile
  decedentInfo;

  decedent: Decedent;
  // financial summary form
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

  // list of decedent's properties: aka assets or whatever they would be potentially leaving behind
  properties: DecedentProperty[] = [];

  constructor(
    private decedentService: DecedentService,
    private userService: UserService,
    private toastService: HotToastService,
    private financialSummaryService: FinancialSummaryService,
    private decedentPropertyService: DecedentPropertyService,
  ) {}

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    // check to see if there is a decedent record assosciated with the matter id

    this.decedentService.getDecedentWithMatterId(this.matter.id).subscribe((decedent) => {
      if (decedent) {
        this.decedent = decedent;

        this.loadProperties();
        // if there is a decedent record, make the call to the user service to get the decedent user profile
        this.userService.get(decedent.user_id).subscribe((user) => {
          if (user) {
            this.decedentInfo = user;
            console.log('decedentInfo', this.decedentInfo);
            console.log('decedent', this.decedent);

            // if there is a decedent load the financial summary for the decedent
            this.load();
          }
        });
      } else {
        this.toastService.error('Please enter Decedent Information First!');
      }
    });
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
  private load(): void {
    this.financialSummaryService.getWithUserId(this.decedent.user_id).subscribe((res) => {
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
              user_id: this.decedent.user_id,
              primary_residence_address: this.decedentInfo.address,
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
      primary_residence_address: this.decedentInfo.address,
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

  // add a property into the list
  addProperty(): void {
    this.properties.push(
      new DecedentProperty(this.decedent.user_id, this.matter.id, this.decedent.id),
    );
  }


  upsertProperties(): void {
    this.properties.forEach((property) => {
      this.decedentPropertyService.upsert(property).subscribe((res) => {
        console.log('res', res);
        if (res) {
          property.id = res[0].id;
        }
      });
    });
  }

  private loadProperties(): void {
    this.decedentPropertyService
      .getDecedentPropertyWithDecedentId(this.decedent.id)
      .subscribe((res) => {
        console.log('res', res);
        if (res.length > 0) {
          res.forEach((property) => {
            this.properties.push(property);
          });
        }
      });
  }
  private loadProperty(property) : void {
    let created = {
      id: property.id,
      user_id: property.user_id,
      matter_id: property.matter_id,
      decedent_id: property.decedent_id,

      name: property.name,
      value: property.value.toString(),
      beneficiary: property.beneficiary,
      note: property.note,
    }
  }
}
