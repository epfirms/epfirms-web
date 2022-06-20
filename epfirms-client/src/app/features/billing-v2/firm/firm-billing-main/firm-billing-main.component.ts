import { Component, OnInit } from '@angular/core';
import { Invoice } from '@app/core/interfaces/Invoice';
import { DAY } from '@app/core/util/timeConstants';
import { ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';
import { EpModalService } from '@app/shared/modal/modal.service';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ClientSubscriptionService } from '../../services/client-subscription.service';
import { InvoiceService } from '../../services/invoice.service';
import { CreateInvoiceOverlayComponent } from '../create-invoice-overlay/create-invoice-overlay.component';
import { CreateSubscriptionOverlayComponent } from '../create-subscription-overlay/create-subscription-overlay.component';

@Component({
  selector: 'app-firm-billing-main',
  templateUrl: './firm-billing-main.component.html',
  styleUrls: ['./firm-billing-main.component.scss'],
})
export class FirmBillingMainComponent implements OnInit {
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

  // page state
  // 'invoices' or 'subscriptions'
  state: string = 'invoices';

  // range filter
  dateRange = 30;

  // stats
  openInvoiceTotal: number = 0;
  overDueInvoiceTotal: number = 0;
  paidInvoiceTotal: number = 0;
  subscriptions: any;

  constructor(
    private _invoiceService: InvoiceService,
    private currentUserService: CurrentUserService,
    private _modalService: EpModalService,
    private _stripeService: StripeService,
    private _toastService: HotToastService,
    private _clientSubscriptionService: ClientSubscriptionService,
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

              this.onRangeChange();
            }
          });
          this.loadSubscriptions(user.scope.firm_access.firm_id);
      }
    });
  }

  private loadSubscriptions(firmId) : void {
    this._clientSubscriptionService.getAllWithFirmId(firmId).subscribe(subscriptions => {

      if (subscriptions.length > 0) {
        this.subscriptions = subscriptions;
      }
      else {
        this._toastService.error('You have no subscriptions.');
      }
    });
  }
  setState(state: string) {
    this.state = state;
  }

  openInvoice(url: string): void {
    window.open(url, '_blank');
  }

  reloadStats(): void {
    this.getOpenInvoiceTotal();
    this.getPaidInvoiceTotal();
    this.getOverdueInvoiceTotal();
  }

  getOpenInvoiceTotal(): void {
    let total = 0;
    this.invoices.forEach((invoice) => {
      if (invoice.status === 'open') {
        total += invoice.total;
      }
    });
    this.openInvoiceTotal = total;
  }

  getPaidInvoiceTotal(): void {
    let total = 0;
    this.invoices.forEach((invoice) => {
      if (invoice.status === 'paid') {
        total += invoice.total;
      }
    });
    this.paidInvoiceTotal = total;
  }

  getOverdueInvoiceTotal(): void {
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
    this.overDueInvoiceTotal = total;
  }

  statusColoration(invoice: Invoice): string {
    let isOverDue = new Date().getTime() > new Date(invoice.due_date).getTime();

    let styleString = 'bg-white';

    if (invoice.status === 'open') {
      styleString = 'bg-blue-200';
    } else if (invoice.status === 'paid') {
      styleString = 'bg-green-200';
    }
    if (isOverDue && invoice.status === 'open') {
      styleString = 'bg-red-200';
    }

    return styleString;
  }


  subscriptionStatusColoration(subscription): string {

    let styleString = 'bg-white';

    if (subscription.status === 'active') {
      styleString = 'bg-blue-200';
    } 
    
   else if ( subscription.status === 'past due') {
      styleString = 'bg-red-200';
    }

    return styleString;
  }

  getDueDayOfMonth(monthly_due_date): number {
    let dueDate = new Date(monthly_due_date);
    return dueDate.getDate() + 1;
  }

  openCreateInvoiceOverlay(): void {
    let modal = this._modalService.create({
      epContent: CreateInvoiceOverlayComponent,
      epModalType: 'slideOver',
      epAutofocus: null,
    });
    modal.afterClose.subscribe((data) => {
      if (data) {
        this.loadInvoices();
      }
    });
  }

  openCreateSubscriptionOverlay(): void {
    let modal = this._modalService.create({
      epContent: CreateSubscriptionOverlayComponent,
      epModalType: 'slideOver',
      epAutofocus: null,
    });
    modal.afterClose.subscribe((data) => {
      if (data) {
        console.log('subscription data', data);
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
  onFilterChanges(): void {
    this.onRangeChange();
    if (this.filterSettings.draft) {
      this.invoices = this.invoices.filter((i) => i.status === 'draft');
    } else if (this.filterSettings.open) {
      this.invoices = this.invoices.filter((i) => i.status === 'open');
    } else if (this.filterSettings.paid) {
      this.invoices = this.invoices.filter((i) => i.status === 'paid');
    } else {
      this.invoices = this.invoices;
    }
  }

  onRangeChange(): void {
    if (this.dateRange < 0) {
      this.invoices = this.defaultInvoiceList;
    } else {
      this.invoices = this.defaultInvoiceList.filter(
        (invoice) =>
          new Date(invoice.created_at).getTime() > new Date().getTime() - this.dateRange * DAY,
      );
    }
    this.reloadStats();
  }
}
