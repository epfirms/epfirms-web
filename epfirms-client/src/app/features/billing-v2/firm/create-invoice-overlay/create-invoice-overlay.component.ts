import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EpModalRef } from '@app/shared/modal/modal-ref';
import { currencyInputMask, toFloat } from '@app/core/util/currencyUtils';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { Observable } from 'rxjs';
import { Matter } from '@app/core/interfaces/matter';
@Component({
  selector: 'app-create-invoice-overlay',
  templateUrl: './create-invoice-overlay.component.html',
  styleUrls: ['./create-invoice-overlay.component.scss'],
})
export class CreateInvoiceOverlayComponent implements OnInit {
  currencyMask = currencyInputMask;
  matters$: Observable<Matter[]>;

  matters: Matter[] = [];

  //list of matters in option format
  matterOptions: any[] = [];

  constructor(private _modalRef: EpModalRef, private _matterService: MatterService) {
    this.matters$ = this._matterService.filteredEntities$;
  }

  ngOnInit(): void {
    this.loadMatters();
  }

  loadMatters(): void {
    this.matters$.subscribe((matters) => {
      if (matters) {
        this.matters = matters;
        this.createMatterOptionsList();
        console.log(this.matters);
      }
    });
  }

  private createMatterOptionsList(): void {
    this.matterOptions = this.matters.map((matter) => {
      return {
        label: matter.title + ' - ' + matter.client.full_name,
        value: matter.id,
      };
    });
  }

  close() {
    this._modalRef.close();
  }

  onSelectedMatter(matterId: number) {

    console.log(matterId);
  }
}
