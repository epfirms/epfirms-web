import { Component, OnInit } from '@angular/core';
import { ContractService } from '@app/features/contract-builder/contract.service';
import { Matter } from '@app/features/matter/matter.model';
import { selectDenormalizedMatters } from '@app/features/matter/matter.selectors';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-contracts',
  templateUrl: './client-contracts.component.html',
  styleUrls: ['./client-contracts.component.scss'],
})
export class ClientContractsComponent implements OnInit {
  contracts$ = Observable;
  
  matters$: Observable<Matter[]>;

  // properties
  matterList;

  contractList = [];

  currentContract;

  isContractViewerVisible: boolean = false;

  constructor(private contractService: ContractService, private store: Store) {
    // get the matters associated with the client
    this.matters$ = this.store.select(selectDenormalizedMatters);
  }

  ngOnInit(): void {
    // get the matters from obs and convert to list
    this.matters$.subscribe((res) => {
      this.matterList = res;
      this.matterList.forEach((matter) => {
        this.loadContracts(matter.id);
      });
    });
  }

  loadContracts(matterId): void {
    this.contractService.getWithMatterId(matterId).subscribe((res) => this.contractList.push(res));
  }

  openContractViewer(contract): void {
    this.currentContract = contract;
    this.isContractViewerVisible = true;
  }
}
