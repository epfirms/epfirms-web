import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Invoice } from '@app/core/interfaces/Invoice';
import { Matter } from '@app/core/interfaces/matter';
import { currencyInputMask, toFloat } from '@app/core/util/currencyUtils';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { EpModalRef } from '@app/shared/modal/modal-ref';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-edit-invoice-overlay',
  templateUrl: './edit-invoice-overlay.component.html',
  styleUrls: ['./edit-invoice-overlay.component.scss'],
})
export class EditInvoiceOverlayComponent implements OnInit {
  @Input() invoice;

  currencyMask = currencyInputMask;

  // the invoice form
  invoiceForm = new FormGroup({
    amount: new FormControl('', Validators.required),
    due_date: new FormControl('', Validators.required),
    invoice_message: new FormControl('', Validators.required),
  });

  constructor(
    private _modalRef: EpModalRef,
    private _toastService: HotToastService,
    private _invoiceService: InvoiceService,
    private _stripeService: StripeService,
  ) {}

  ngOnInit(): void {
    console.log(this._modalRef);
  }

  patchInvoice(): void {
    this.invoiceForm.patchValue({
      amount: this.invoice.amount,
      due_date: this.invoice.due_date,
      invoice_message: this.invoice.invoice_message,
    });
  }

  close() {
    this._modalRef.close();
  }

  submit(): void {
    try {
      if (toFloat(this.invoiceForm.value.amount) > 999999) {
        this._toastService.error('The amount cannot be greater than $999,999.99');

        throw new Error('The amount cannot be greater than $999,999.99');
      }

      if (Date.now() > new Date(this.invoiceForm.value.due_date).getTime()) {
        this._toastService.error('The due date must be in future');
        throw new Error('The due date must be in future');
      }

      // create the invoice update

      // call stripe service to update the invoice
    } catch (error) {
      console.error(error);
    }
  }
}
