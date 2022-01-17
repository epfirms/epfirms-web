import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LegalInsuranceService } from '@app/shared/_services/legal-insurance-service/legal-insurance.service';

@Component({
  selector: 'app-legal-insurance',
  templateUrl: './legal-insurance.component.html',
  styleUrls: ['./legal-insurance.component.scss']
})
export class LegalInsuranceComponent implements OnInit {

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
  }

  submit() : void {
    this.legalInsuranceService.create(this.insuranceForm.value).subscribe(res => console.log(res));
  }

  

}
