import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Matter } from '@app/core/interfaces/matter';
import { LegalInsuranceService } from '@app/shared/_services/legal-insurance-service/legal-insurance.service';

@Component({
  selector: 'app-legal-insurance',
  templateUrl: './legal-insurance.component.html',
  styleUrls: ['./legal-insurance.component.scss']
})
export class LegalInsuranceComponent implements OnInit {
  //input bindings
  @Input()
  get matter() {
    return this._matter;
  }
  set matter(value: Matter) {
    this._matter = value;
  }
  private _matter: Matter;


  // form for insurance stuff
  insuranceForm = new FormGroup({
    user_id: new FormControl(),
    firm_id: new FormControl(),
    matter_id: new FormControl(),
    policy_number: new FormControl(),
    policy_holder: new FormControl(),
    social_security: new FormControl(),
    company_name: new FormControl(),
  });

  constructor(
    private legalInsuranceService : LegalInsuranceService
  ) { }

  ngOnInit(): void {
    console.log("MATTER", this.matter);
    //init the insurance form values from the matter binding
    this.initInsuranceForm();
  }

  submit() : void {
    this.legalInsuranceService.create(this.insuranceForm.value).subscribe(res => console.log(res));
  }

  initInsuranceForm() : void {
    this.insuranceForm.patchValue({
      user_id: this.matter.client.id,
      firm_id: this.matter.firm_id,
      matter_id: this.matter.id
    });
    this.legalInsuranceService.get(this.matter.id).subscribe(res => {
      console.log(res);
      if (res) {
        this.insuranceForm.patchValue({
          policy_number: res.policy_number,
          company_name: res.company_name,
          policy_holder: res.policy_holder,
          social_security: res.social_security,
        });
      }
    });
  }

  

}
