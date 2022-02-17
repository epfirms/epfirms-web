import { Component, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';
import { ContractService } from '@app/features/contract-builder/contract.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-contracts',
  templateUrl: './client-contracts.component.html',
  styleUrls: ['./client-contracts.component.scss']
})
export class ClientContractsComponent implements OnInit {


  contracts$ = Observable;
  matters$ : Observable<Matter[]>;
   // properties
   matterList;
   contractList = [];

  constructor(
    private contractService : ContractService,
    private matterService : MatterService
  ) {
    // get the matters associated with the client
    this.matters$ = this.matterService.entities$;
   }

  ngOnInit(): void {
    // get the matters from obs and convert to list
    this.matters$.subscribe(res => {
      this.matterList = res;
      this.matterList.forEach(matter => {
        this.loadContracts(matter.id);
      });
    });

  }

  loadContracts(matterId): void {
    this.contractService.getWithMatterId(matterId).subscribe(res => this.contractList.push(res));
  }

}
