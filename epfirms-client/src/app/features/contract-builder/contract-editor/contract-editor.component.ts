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

  // this form will be generated and populated based on the template vars that are used
  // each property will be used as a binding and a value
  form = {};
  keys = [];

  // content of the template in the quilljs object
  content;

  // object thats holds the data for prefilling the bindings
  templateVars;



 constructor(
   private contractService : ContractService
 ) {

 
  }

 ngOnInit(): void {
   console.log(this.matter);
   console.log("TEMPLATE OBJ", this.template);
   console.log("BILLING CONFIG", this.billingConfig);

   this.content = this.template.content;
   this.initTemplateVars();
   this.populateForm();
   this.reloadContract();
 }

 private populateForm() : void {
   this.template.template_vars.split(',').forEach(label => {
    let formattedLabel = label.replace(/@/g, '').replace(/\_/g, ' ');
    console.log("FORMATTED LABEL", formattedLabel);
    this.form[formattedLabel] = this.templateVars[label];
    this.keys.push(formattedLabel);
   });

   console.log(this.form);
   console.log("KEYS", this.keys);

 }

 reloadContract() : void {
   let unformattedCopy = this.template.content;
   this.keys.forEach(field => {
     
     let formatted = `@${field}@`.replace(/\s/g, '_');
     console.log("Content before", unformattedCopy);
     unformattedCopy = unformattedCopy.replaceAll(formatted, this.form[field]);
     console.log("content after", unformattedCopy);
   });

   this.content = unformattedCopy;
 }

 private initTemplateVars() : void {
    this.templateVars = {
      "@TODAY@": new Date().toDateString(),
      "@CLIENT@": this.matter.client.full_name,
      "@CLIENT_ADDRESS@": this.matter.client.address,
      "@CLIENT_STATE@": this.matter.client.state,
      "@CLIENT_COUNTY@": this.matter.client.county,
      "@CLIENT_CITY@": this.matter.client.city,
      "@CLIENT_ZIPCODE@": this.matter.client.zip,
  
      "@ATTORNEY@": this.matter.attorney.full_name,
      "@ATTORNEY_ADDRESS@": this.matter.attorney.address,
      "@ATTORNEY_STATE@": this.matter.attorney.state,
      "@ATTORNEY_COUNTY@": this.matter.attorney.county,
      "@ATTORNEY_CITY@": this.matter.attorney.city,
      "@ATTORNEY_ZIPCODE@": this.matter.attorney.zip,
      
      "@LAW_FIRM@": this.billingConfig.firmName,
      "@DESCRIPTION@": this.matter.description,
  
      "@FLAT_RATE_FEE@": this.billingConfig.flatRateAmount,
      "@COVERED_ITEMS@": "Enter Comma Separated List",
      
  
      "@RETAINER_AMOUNT@": this.billingConfig.retainerAmount,
      "@PRE_SETTLEMENT_CONTINGENCY@": this.billingConfig.beforeSettlementPercent,
      "@POST_SETTLEMENT_CONTINGENCY@": this.billingConfig.afterSettlementPercent,
  
    }
 }
 

 

 submit() : void {
   this.contractService.upsert({
     matter_id: this.matter.id,
     firm_id: this.matter.firm_id,
     user_id: this.matter.client.id,
     attorney_id: this.matter.attorney.id,
     content: this.content
   }).subscribe(res => console.log(res));
   
   this.isComplete = true;
  this.isCompleteChange.emit(true);
 }

 back() : void {
  this.isComplete = false;
  this.isCompleteChange.emit(false);
}


}
