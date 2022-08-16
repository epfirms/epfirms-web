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
  // this will be initialized with the _modalRef.config.epComponentParams.invoice
  invoice: Invoice;

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
    this.initInvoice();
    console.log(this.invoice);
    
  }

  private initInvoice(): void {
    this.invoice = this._modalRef.getConfig().epComponentParams.invoice as Invoice;
    this.patchInvoice();
  }

  private patchInvoice(): void {
    this.invoiceForm.patchValue({
      amount: this.invoice.total.toString(),
      invoice_message: this.invoice.description,
      due_date: this.invoice.due_date.split('T')[0],
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

      
   


      // get the new date and account for weird day offset
      let newDateInSeconds = (new Date(this.invoiceForm.value.due_date).getTime() / 1000) + 60 * 60 * 24;

      // create the invoice update
      let invoiceUpdate = {
        id: this.invoice.invoice_id,
        amount_due: toFloat(this.invoiceForm.value.amount),
        description: this.invoiceForm.value.invoice_message,
        due_date: newDateInSeconds,
      }

      // call stripe service to update the invoice
      this._stripeService.updateInvoice(invoiceUpdate).subscribe(res => console.log("update res", res));
    } catch (error) {
      console.error(error);
    }
  }

onChange(event) {
  console.log(event);
}


}
