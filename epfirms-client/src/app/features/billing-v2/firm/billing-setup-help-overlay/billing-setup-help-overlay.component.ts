import { Component, OnInit } from '@angular/core';
import { EpModalRef } from '@app/shared/modal/modal-ref';

@Component({
  selector: 'app-billing-setup-help-overlay',
  templateUrl: './billing-setup-help-overlay.component.html',
  styleUrls: ['./billing-setup-help-overlay.component.scss']
})
export class BillingSetupHelpOverlayComponent implements OnInit {

  constructor(private _modalRef : EpModalRef) { }

  ngOnInit(): void {
  }

  close(): void {
    this._modalRef.close();
  }

}
