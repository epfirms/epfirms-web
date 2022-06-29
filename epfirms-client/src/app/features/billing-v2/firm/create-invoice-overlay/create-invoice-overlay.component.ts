import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EpModalRef } from '@app/shared/modal/modal-ref';
import { currencyInputMask, toFloat } from '@app/core/util/currencyUtils';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { Observable, take } from 'rxjs';
import { Matter } from '@app/core/interfaces/matter';
import { Invoice } from '@app/core/interfaces/Invoice';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { InvoiceService } from '../../services/invoice.service';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';
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

  // the currently selected matter
  selectedMatter: Matter;

  // the invoice form
  invoiceForm = new FormGroup({
    amount: new FormControl('', Validators.required),
    due_date: new FormControl('', Validators.required),
    invoice_message: new FormControl('', Validators.required),
  });

  constructor(
    private _modalRef: EpModalRef,
    private _matterService: MatterService,
    private _toastService: HotToastService,
    private _invoiceService: InvoiceService,
    private _stripeService : StripeService
  ) {
    this.matters$ = this._matterService.filteredEntities$;
  }

  ngOnInit(): void {
    this.loadMatters();
  }



  loadMatters(): void {
    this.matters$.pipe(take(1)).subscribe((matters) => {
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
    this.selectedMatter = this.matters.find((matter) => matter.id === matterId);
    console.log('the selected matter is: ', this.selectedMatter);
  }

  // this will create an invoice object in our DB
  // this will create an invoice object with Stripe
  // this will set the status in both places as 'draft'

  submit(isDraft : boolean): void {
    
    try {
      if (toFloat(this.invoiceForm.value.amount) > 999999) {
      this._toastService.error(
        'The amount cannot be greater than $999,999.99',
      );


      throw new Error('The amount cannot be greater than $999,999.99');
      
    }

    if (Date.now() > new Date(this.invoiceForm.value.due_date).getTime()) {

      this._toastService.error(
        'The due date must be in future'
      );
      throw new Error('The due date must be in future');

    }
    //creat a new invoice
    if (this.selectedMatter.client.email === null || this.selectedMatter.client.email === '' || this.selectedMatter.client.email === undefined) {
      this._toastService.error(
        'The client email is not set. Please set the client email in the client profile.'
      );
      throw new Error('The client email is not set');
    }

    if (this.selectedMatter && this.invoiceForm.valid) {
      let invoice = new Invoice(
        this.selectedMatter.id,
        this.selectedMatter.client.id,
        this.selectedMatter.firm_id,
        toFloat(this.invoiceForm.value.amount),
        this.invoiceForm.value.invoice_message,
      );
      invoice.setDate(this.invoiceForm.value.due_date);
      invoice.setStatus('pending');
      invoice.setAutoAdvance(isDraft);
      console.log('new invoice: ', invoice);
      this._invoiceService.upsert(invoice).subscribe((res) => {
        console.log(res);
        if (res) {
          
          this._stripeService.createInvoice(res[0].id).subscribe((stripeRes) => {
            if (stripeRes) {

            console.log(stripeRes);
            }
          });
          console.log('invoice created: ', res);
          this._toastService.success('Invoice created');
          this._modalRef.close(true);
        } else {
          this._toastService.error('Error creating invoice');
        }
      });
    } else {
      this._toastService.error('Please select a matter and fill out the form correctly.');
    }
    } catch (error) {
     console.error(error);
    }
  }
}
