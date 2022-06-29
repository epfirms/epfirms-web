import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from '@app/core/interfaces/Invoice';
import { Matter } from '@app/core/interfaces/matter';
import { MatterBillingSettings } from '@app/core/interfaces/MatterBillingSettings';
import { BillingSetupHelpOverlayComponent } from '@app/features/billing-v2/firm/billing-setup-help-overlay/billing-setup-help-overlay.component';
import { InvoiceService } from '@app/features/billing-v2/services/invoice.service';
import { EpModalService } from '@app/shared/modal/modal.service';
import { MatterBillingSettingsService } from '@app/shared/_services/matter-billing-settings-service/matter-billing-settings.service';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';
import { HotToastService } from '@ngneat/hot-toast';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-billing-setup',
  templateUrl: './billing-setup.component.html',
  styleUrls: ['./billing-setup.component.scss'],
})
export class BillingSetupComponent implements OnInit {
  @Input() matter: Matter;
  billingType: string;
  splitPayment: boolean = false;

  // currency mask
  currencyInputMask = createMask({
    prefix: '$',
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
  });

  matterBillingSetting: MatterBillingSettings;
  billingSettings: MatterBillingSettings;

  // confirmation modal properties
  isModalVisible: boolean = false;

  constructor(
    private matterBillingSettingsService: MatterBillingSettingsService,
    private invoiceService: InvoiceService,
    private toastService: HotToastService,
    private stripeService: StripeService,
    private _modalService: EpModalService
  ) {}

  ngOnInit(): void {
    this.initBillingSettingsForm();
    this.loadBillingSettings();
  }

  private initBillingSettingsForm(): void {
    this.billingSettings = new MatterBillingSettings(this.matter.id);
  }

  private loadBillingSettings(): void {
    this.matterBillingSettingsService
      .getWithMatterId(this.matter.id)
      .subscribe((matterBillingSetting) => {
        if (matterBillingSetting) {
          this.billingSettings.setAllValues(matterBillingSetting);
        }
      });
  }

  private roundDownAmounts(): void {
    this.billingSettings.initial_payment = Math.floor(this.billingSettings.initial_payment);
    this.billingSettings.flat_rate_amount = Math.floor(this.billingSettings.flat_rate_amount);
    this.billingSettings.final_payment = Math.floor(this.billingSettings.final_payment);

    this.billingSettings.retainer_amount = Math.floor(this.billingSettings.retainer_amount);
    this.billingSettings.minimum_payment_amount = Math.floor(
      this.billingSettings.minimum_payment_amount,
    );
  }

  upsertBillingSettings() {
    this.matterBillingSettingsService.create(this.billingSettings).subscribe((res) => {
      console.log('billing settings upsert', res);
      if (res) {
        this.billingSettings.id = res[0].id;
      }
    });
  }

  // updates the initial_invoice_sent property on the MatterBillingSettings
  private updateInvoiceSentStatus(): void {
    this.billingSettings.initial_invoice_sent = true;
    this.upsertBillingSettings();
  }

  private splitRateAutomation(): void {
    const initialInvoice = new Invoice(
      this.matter.id,
      this.matter.client.id,
      this.matter.firm_id,
      this.billingSettings.initial_payment,
      this.billingSettings.initial_invoice_message,
    );
    initialInvoice.setAutoAdvance(true);

    console.log("initial invoice", initialInvoice);

    const finalInvoice = new Invoice(
      this.matter.id,
      this.matter.client.id,
      this.matter.firm_id,
      this.billingSettings.final_payment,
      this.billingSettings.final_invoice_message,
    );
    finalInvoice.setAutoAdvance(true);

    finalInvoice.setDate(new Date(this.billingSettings.final_payment_due_date).toUTCString());

    console.log("final invoice", finalInvoice);
    this.invoiceService.upsert(initialInvoice).subscribe((initial) => {
      console.log('initial invoice', initial);
      if (initial) {
        this.stripeService.createInvoice(initial[0].id).subscribe((invoice) => {
          console.log('initial stripe invoice route', invoice);
          if (invoice) {
            this.updateInvoiceSentStatus();
          }

          this.invoiceService.upsert(finalInvoice).subscribe((final) => {
            console.log('final invoice', final);
            this.stripeService.createInvoice(final[0].id).subscribe((finalInvoice) => {
              console.log('final stripe invoice route', finalInvoice);
              if (finalInvoice) {
                this.updateInvoiceSentStatus();
              }
            });
          });
        });
      }
    });
  }

  private nonSplitRateAutomation(): void {
    const initialInvoice = new Invoice(
      this.matter.id,
      this.matter.client.id,
      this.matter.firm_id,
      this.billingSettings.flat_rate_amount,
      this.billingSettings.initial_invoice_message,
    );
    initialInvoice.setAutoAdvance(true);
    this.invoiceService.upsert(initialInvoice).subscribe((initial) => {
      console.log('initial invoice, not split', initial);
      if (initial) {
        this.stripeService.createInvoice(initial[0].id).subscribe((invoice) => {
          console.log('initial stripe invoice route', invoice);
          if (invoice) {
            this.updateInvoiceSentStatus();
          }
        });
      }
    });
  }

  private submitFlatRate(): void {
    // if their is a split, there will be two invoices generated
    // the initial due date is always 30 days from today
    // the final invoice due date is the date the user enters
    if (this.billingSettings.split_flat_rate) {
      this.splitRateAutomation();
    }
    // if not split
    else {
      this.nonSplitRateAutomation();
    }
  }

  private handleFlatRateSubmission(): void {
    if (
      this.billingSettings.flat_rate_amount <= 0 &&
      this.billingSettings.split_flat_rate === false
    ) {
      this.toastService.error('Please enter an amount for flat rate');
    } else if (
      this.billingSettings.initial_payment <= 0 &&
      this.billingSettings.split_flat_rate === true
    ) {
      this.toastService.error('Please enter an amount for initial payment');
    } else if (
      this.billingSettings.final_payment <= 0 &&
      this.billingSettings.split_flat_rate === true
    ) {
      this.toastService.error('Please enter an amount for final payment');
    } else if (
      this.billingSettings.final_payment_due_date === null &&
      this.billingSettings.split_flat_rate === true
    ) {
      this.toastService.error('Please enter a due date for final payment');
    } else {
      console.log('submit flat rate called');
      this.submitFlatRate();
      this.closeConfirmationModal();
    }
  }

  private hourlyAutomation(): void {
    const hourlyInvoice = new Invoice(
      this.matter.id,
      this.matter.client.id,
      this.matter.firm_id,
      this.billingSettings.retainer_amount,
      this.billingSettings.retainer_invoice_message,
    );

    this.invoiceService.upsert(hourlyInvoice).subscribe((invoice) => {
      console.log('hourly invoice', invoice);
      if (invoice) {
        this.stripeService.createInvoice(invoice[0].id).subscribe((stripeInvoice) => {
          console.log('hourly stripe invoice route', stripeInvoice);
          if (stripeInvoice) {
            this.updateInvoiceSentStatus();
          }
        });
      }
    });
  }

  private handleHourlySubmission(): void {
    if (this.billingSettings.retainer_amount <= 0) {
      this.toastService.error('Please enter an amount for retainer');
    } else {
      // this automation creates an invoice object and sends the initial retainer invoice to client
      this.hourlyAutomation();
      this.closeConfirmationModal();
    }
  }

  openConfirmationModal(): void {
    this.isModalVisible = true;
  }

  closeConfirmationModal(): void {
    this.isModalVisible = false;
  }

  submit(): void {
    this.roundDownAmounts();
    // handle the flat rate invoice automation
    if (this.billingSettings.billing_type === 'flatrate') {
      this.handleFlatRateSubmission();
    }
    // this has been removed until we figure out online payments for IOLTA
    //  else if (this.billingSettings.billing_type === 'hourly') {
    //   // this.handleHourlySubmission();
    //   console.log("handle hourly")
    // }
  }

openHelpOverlay(): void {
    let modal = this._modalService.create({
      epContent: BillingSetupHelpOverlayComponent,
      epModalType: 'slideOver',
      epAutofocus: null,
    });
    modal.afterClose.subscribe((data) => {
      if (data) {
        console.log(data);
      }
    });
  }
}
