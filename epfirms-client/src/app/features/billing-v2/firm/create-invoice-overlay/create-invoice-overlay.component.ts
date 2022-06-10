import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EpModalRef } from '@app/shared/modal/modal-ref';
import {currencyInputMask, toFloat} from '@app/core/util/currencyUtils';
@Component({
  selector: 'app-create-invoice-overlay',
  templateUrl: './create-invoice-overlay.component.html',
  styleUrls: ['./create-invoice-overlay.component.scss']
})
export class CreateInvoiceOverlayComponent implements OnInit {

  currencyMask = currencyInputMask;

  constructor(private _modalRef : EpModalRef) { }

  ngOnInit(): void {
  }

  close() {
    
    this._modalRef.close();
  }

}
