import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContractService } from '../contract.service';


@Component({
  selector: 'app-contract-editor',
  templateUrl: './contract-editor.component.html',
  styleUrls: ['./contract-editor.component.scss']
})
export class ContractEditorComponent implements OnInit {

  @Input() matter;
  @Input() billingConfig;
  @Input() isComplete;
  @Input() template;
  @Output() isCompleteChange = new EventEmitter<boolean>();

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
   pre_settlement_percent : new FormControl(0),
   post_settlement_percent : new FormControl(0),
   fee: new FormControl(0),
   covered_items : new FormControl('[COVERED ITEMS]'),
   retainer_amount: new FormControl(0),
   attorney_signed: new FormControl(true),
   contract_type: new FormControl(),
   case_id: new FormControl()
  });

 constructor(
   private contractService : ContractService
 ) { }

 ngOnInit(): void {
   console.log(this.matter);
   console.log("TEMPLATE OBJ", this.template);
 }

 

 submit() : void {
   
   this.isComplete = true;
  this.isCompleteChange.emit(true);
 }

 back() : void {
  this.isComplete = false;
  this.isCompleteChange.emit(false);
}


}
