import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-builder',
  templateUrl: './contract-builder.component.html',
  styleUrls: ['./contract-builder.component.scss']
})
export class ContractBuilderComponent implements OnInit {

  //state for the actual contract editor
  isCreateMode : boolean = false;
  //observable of current user
  currentUser$;
  currentUser;

  // contract templates
  contractTemplates;

  constructor(
    private contractService : ContractService,
    
  ) { 
    

  }

  ngOnInit(): void {
    
      this.loadContractTemplates();
    
  }

  toggleCreateMode() : void {
    this.isCreateMode = true;
  }

  loadContractTemplates() : void {
    this.contractService.getTemplatesByFirmId().subscribe(res => this.contractTemplates = res);
  }

  delete(id) : void {
    this.contractService.deleteTemplate(id).subscribe(res => this.loadContractTemplates());
  }

}
