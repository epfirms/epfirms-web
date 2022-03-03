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

 constructor(
   private contractService : ContractService
 ) {

 
  }

 ngOnInit(): void {
   console.log(this.matter);
   console.log("TEMPLATE OBJ", this.template);
   console.log("BILLING CONFIG", this.billingConfig);

   this.content = this.template.content;
   this.populateForm();
 }

 private populateForm() : void {
   this.template.template_vars.split(',').forEach(label => {
    let formattedLabel = label.replace(/@/g, '').replace('_', ' ');
    this.form[formattedLabel] = "";
    this.keys.push(formattedLabel);
   });

   console.log(this.form);

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
