import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContractService } from '../contract.service';
@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.scss']
})
export class HourlyComponent implements OnInit {

  @Input() matter;
  @Input() billingConfig;
  @Input() isVisible;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  form = new FormGroup({
   date : new FormControl(),
   county: new FormControl('[COUNTY]'),
   state: new FormControl('[STATE]'),
   client: new FormControl('[CLIENT]'),
   attorney: new FormControl('[ATTORNEY]'),
   law_firm: new FormControl('[LAW FIRM]'),
   attorney_city: new FormControl('[ATTORNEY CITY]'),
   attorney_county: new FormControl('[ATTORNEY COUNTY]'),
   attorney_state: new FormControl('[ATTORNEY STATE]'),
   description: new FormControl('[DESCRIPTION]'),
   user_id : new FormControl(),
   matter_id : new FormControl(),
   firm_id : new FormControl(),
   attorney_id : new FormControl(),
   retainer_amount: new FormControl(0)
  });

 constructor(
   private contractService : ContractService
 ) { }

 ngOnInit(): void {
   console.log(this.matter);
   this.initForm();
 }

 // this form will init the values of the form group
  private initForm() : void {
   this.form.patchValue({
     date: new Date().toDateString(),
     state: this.matter.client.state,
     client: this.matter.client.full_name,
     attorney: this.matter.attorney.full_name,
     attorneyCity: this.matter.attorney.city,
     attoneyState: this.matter.attorney.state,
     description: this.matter.case_id,
     firm_id: this.matter.firm_id,
     user_id: this.matter.client.id,
     matter_id: this.matter.id,
     attorney_id: this.matter.attorney.id
     

   });
 }

 submit() : void {
   this.contractService.upsert(this.form.value).subscribe(res => console.log(res));
 }

 close() : void {
   this.isVisible = false;
   this.isVisibleChange.emit(this.isVisible);
 }


}
