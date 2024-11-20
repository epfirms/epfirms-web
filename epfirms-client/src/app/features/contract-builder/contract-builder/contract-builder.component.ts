import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-builder',
  templateUrl: './contract-builder.component.html',
  styleUrls: ['./contract-builder.component.scss'],
})
export class ContractBuilderComponent implements OnInit {
  //state for the actual contract editor
  isCreateMode: boolean = false;

  // state for selection mode
  // this is used in the setup flow
  @Input() isSelectionMode: boolean = false;

  //output that is used for telling the setup flow if contract selection is complete
  @Output() isContractComplete: EventEmitter<boolean> = new EventEmitter<boolean>();

  //output for delivering the selected document/contract to the parent component if needed
  @Output() selectedTemplate: EventEmitter<object> = new EventEmitter<object>();

  // contract templates
  contractTemplates;

  templateToEdit;

  constructor(private contractService: ContractService) {}

  ngOnInit(): void {
    this.loadContractTemplates();
  }

  toggleCreateMode(): void {
    this.isCreateMode = true;
  }

  loadContractTemplates(): void {
    this.contractService.getTemplatesByFirmId().subscribe((res) => (this.contractTemplates = res));
  }

  delete(id): void {
    this.contractService.deleteTemplate(id).subscribe(() => this.loadContractTemplates());
  }

  edit(template): void {
    this.templateToEdit = template;
    this.toggleCreateMode();
  }

  selectTemplate(template): void {
    this.selectedTemplate.emit(template);
    this.complete();
  }

  // these methods complete() and back() are used only in the setup flow atm
  private complete(): void {
    this.isContractComplete.emit(true);
  }

  back(): void {
    this.isContractComplete.emit(false);
  }
}
