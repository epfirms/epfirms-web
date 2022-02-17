import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-viewer',
  templateUrl: './contract-viewer.component.html',
  styleUrls: ['./contract-viewer.component.scss']
})
export class ContractViewerComponent implements OnInit {

  @Input() contract;
  @Input() isVisible : boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  constructor(private contractService : ContractService) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.contract.client_signed = true;
    this.contractService.upsert(this.contract).subscribe();
    this.close();
  }

  close() : void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

}
