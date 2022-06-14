import { Component, OnInit } from '@angular/core';
import { Invoice } from '@app/core/interfaces/Invoice';
import { ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';
import { EpModalService } from '@app/shared/modal/modal.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';
import { HotToastService } from '@ngneat/hot-toast';
import { InvoiceService } from '../../services/invoice.service';
import { CreateInvoiceOverlayComponent } from '../create-invoice-overlay/create-invoice-overlay.component';

@Component({
  selector: 'app-firm-billing-main',
  templateUrl: './firm-billing-main.component.html',
  styleUrls: ['./firm-billing-main.component.scss'],
})
export class FirmBillingMainComponent implements OnInit {
  // state controls the view of the bottom of the component
  state: string = 'flat-rate';

  // list of invoices
  invoices: Invoice[];
  firm;

  // default invoice list
  defaultInvoiceList: Invoice[];

  // controls whether the filter dropdown is visible
  filterDropdownVisible: boolean = false;


  //filter settings object
  filterSettings = {
    paid: false,
    open: false,
    draft: false,
  };


  constructor(
    private _invoiceService: InvoiceService,
    private currentUserService: CurrentUserService,
    private _modalService: EpModalService,
    private _stripeService: StripeService,
    private _toastService: HotToastService,
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  private loadInvoices(): void {
    this.currentUserService.getCurrentUser().subscribe((user) => {
      if (user) {
        this._invoiceService
          .getAllWithFirmId(user.scope.firm_access.firm_id)
          .subscribe((invoices) => {
            if (invoices.length > 0) {
              this.invoices = invoices;
              this.defaultInvoiceList = invoices;
              console.log(this.invoices);
            }
          });
      }
    });
  }
  setState(state: string) {
    this.state = state;
  }

  openInvoice(url: string): void {
    window.open(url, '_blank');
  }

  getOpenInvoiceTotal(): number {
    let total = 0;
    this.invoices.forEach((invoice) => {
      if (invoice.status === 'open') {
        total += invoice.total;
      }
    });
    return total;
  }

  getPaidInvoiceTotal(): number {
    let total = 0;
    this.invoices.forEach((invoice) => {
      if (invoice.status === 'paid') {
        total += invoice.total;
      }
    });
    return total;
  }

  getOverdueInvoiceTotal(): number {
    let total = 0;
    let today = new Date();

    this.invoices.forEach((invoice) => {
      if (invoice.status === 'open') {
        let dueDate = new Date(invoice.due_date);
        if (today.getTime() > dueDate.getTime()) {
          total += invoice.total;
        }
      }
    });
    return total;
  }

  openCreateInvoiceOverlay(): void {
    let modal = this._modalService.create({
      epContent: CreateInvoiceOverlayComponent,
      epModalType: 'slideOver',
      epAutofocus: null,
    });
    modal.afterClose.subscribe((data) => {
      if (data) {
        console.log(data);
        this.loadInvoices();
      }
    });
  }

  // handles the deletion of the invoice if possible
  // an invoice can only be deleted if it is the 'draft' status
  // this requirement is enforced by stripe
  deleteInvoice(invoice: Invoice): void {
    if (invoice.status === 'draft' || invoice.status === 'pending') {
      this._modalService.create({
        epContent: ConfirmDialogComponent,
        epOkText: 'Confirm',
        epCancelText: 'Cancel',
        epAutofocus: null,
        epComponentParams: {
          title: 'Delete Invoice',
          body: 'Are you sure you want to delete the invoice? Its data will not be recoverable after deletion.',
        },
        epOnOk: () => {
          // if the invoice was never sent to stripe, it will still be 'pending' and only needs to be deleted from the db
          if (invoice.status === 'pending') {
            this._invoiceService.delete(invoice.id).subscribe((res) => {
              if (res) {
                this.invoices = this.invoices.filter((i) => i.id !== invoice.id);
                this._toastService.success('Invoice deleted successfully');
                this.loadInvoices();
              }
            });
          } else {
            this.invoices = this.invoices.filter((i) => i.id !== invoice.id);
            this._stripeService.deleteInvoice(invoice.id).subscribe((invoice) => {
              this.loadInvoices();

              if (invoice === true) {
                this._toastService.success('Invoice deleted successfully');
              }
            });
          }
        },
      });
    }
  }

  // handles the finalization of the invoice
  //this does two things: sets the invoice.auto_advance to true, and finalizes the invoice so that stripe sends it
  //this is a one-time action, and the invoice will not be able to be finalized again
  finalizeInvoice(invoice: Invoice): void {
    this._modalService.create({
      epContent: ConfirmDialogComponent,
      epOkText: 'Confirm',
      epCancelText: 'Cancel',
      epAutofocus: null,
      epComponentParams: {
        title: 'Finalize Invoice',
        body: 'Approve this invoice? Once an invoice is finalized, it cannot be deleted or edited. This will allow the invoice to be automatically collected from the client.',
      },
      epOnOk: () => {
        this._stripeService.finalizeInvoice(invoice.id).subscribe((invoice) => {
          if (invoice) {
            console.log(invoice);
            this.loadInvoices();
            this._toastService.success('Invoice finalized successfully');
          }
        });
      },
    });
  }


  toggleFilterDropdown(): void {
    this.filterDropdownVisible = !this.filterDropdownVisible;
  }

  //handles filter changes
  onFilterChanges() : void {
    if (this.filterSettings.draft) {
      this.invoices = this.defaultInvoiceList.filter((i) => i.status === 'draft');
    }
    else if (this.filterSettings.open) {
      this.invoices = this.defaultInvoiceList.filter((i) => i.status === 'open');
    }
   else  if (this.filterSettings.paid) {
      this.invoices = this.defaultInvoiceList.filter((i) => i.status === 'paid');
    }

    else {
      this.invoices = this.defaultInvoiceList;
    }

  }

}
