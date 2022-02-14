import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-flat-rate',
  templateUrl: './flat-rate.component.html',
  styleUrls: ['./flat-rate.component.scss']
})
export class FlatRateComponent implements OnInit {
  
  @Input() matter;

   flatRateForm = new FormGroup({
    date : new FormControl(),
    county: new FormControl('[COUNTY]'),
    state: new FormControl('[STATE]'),
    client: new FormControl('[CLIENT]'),
    attorney: new FormControl('[ATTORNEY]'),
    lawFirm: new FormControl('[LAW FIRM]'),
    attorneyCity: new FormControl('[ATTORNEY CITY]'),
    attorneyCounty: new FormControl('[ATTORNEY COUNTY]'),
    attorneyState: new FormControl('[ATTORNEY STATE]'),
    description: new FormControl('[DESCRIPTION]'),
    fee: new FormControl('[FEE]'),
    coveredItems : new FormControl('[COVERED ITEMS]')
   });

  constructor() { }

  ngOnInit(): void {
    console.log(this.matter);
    this.initForm();
  }

  // this form will init the values of the form group
   private initForm() : void {
    this.flatRateForm.patchValue({
      date: new Date().toDateString(),
      state: this.matter.client.state,
      client: this.matter.client.full_name,
      attorney: this.matter.attorney.full_name,
      attorneyCity: this.matter.attorney.city,
      attoneyState: this.matter.attorney.state,
      description: this.matter.case_id,
      

    });
  }

}
