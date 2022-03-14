import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContractService } from '../../contract.service';

@Component({
  selector: 'app-template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.scss']
})
export class TemplateSelectorComponent implements OnInit {
  
  @Output() selectedTemplate = new EventEmitter<object>();

  contractTemplates = [];

  constructor(
    private contractService : ContractService
  ) { }

  ngOnInit(): void {
    this.loadContractTemplates();
  }

  loadContractTemplates() : void {
    this.contractService.getTemplatesByFirmId().subscribe(res => this.contractTemplates = res);
  }

  selectTemplate(templateContent) : void {
    this.selectedTemplate.emit(templateContent);
  }

}
