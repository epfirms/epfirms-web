import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from '@app/core/interfaces/Invoice';
import { Matter } from '@app/core/interfaces/matter';
import { MatterBillingSettings } from '@app/core/interfaces/MatterBillingSettings';
import { InvoiceService } from '@app/features/billing-v2/services/invoice.service';
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

  private submitFlatRate(): void {
    // if their is a split, there will be two invoices generated
    // the initial due date is always 30 days from today
    // the final invoice due date is the date the user enters
    if (this.billingSettings.split_flat_rate) {
      const initialInvoice = new Invoice(
        this.matter.id,
        this.matter.client.id,
        this.matter.firm_id,
        this.billingSettings.initial_payment,
        this.billingSettings.initial_invoice_message,
      );

      const finalInvoice = new Invoice(
        this.matter.id,
        this.matter.client.id,
        this.matter.firm_id,
        this.billingSettings.final_payment,
        this.billingSettings.final_invoice_message,
      );

      this.invoiceService.upsert(initialInvoice).subscribe((initial) => {
        console.log('initial invoice', initial);
        if (initial) {
          this.stripeService.createInvoice(initial[0].id).subscribe((invoice) => {
            console.log('initial stripe invoice route', invoice);
          });
        }
      });
      this.invoiceService.upsert(finalInvoice).subscribe((final) => {
        console.log('final invoice', final);
      });
    }
    // if not split
    else {
      const initialInvoice = new Invoice(
        this.matter.id,
        this.matter.client.id,
        this.matter.firm_id,
        this.billingSettings.flat_rate_amount,
        this.billingSettings.initial_invoice_message,
      );
      this.invoiceService.upsert(initialInvoice).subscribe((initial) => {
        console.log('initial invoice, not split', initial);
        if (initial) {
          this.stripeService.createInvoice(initial[0].id).subscribe((invoice) => {
            console.log('initial stripe invoice route', invoice);
          });
        }
      });
    }
  }

  openConfirmationModal(): void {
    this.isModalVisible = true;
  }

  closeConfirmationModal(): void {
    this.isModalVisible = false;
  }

  submit(): void {
    // handle the flat rate invoice automation
    if (this.billingSettings.billing_type === 'flatrate') {
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
  }
}
