import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from '@app/core/interfaces/Invoice';
import { Matter } from '@app/core/interfaces/matter';
import { MatterBillingSettings } from '@app/core/interfaces/MatterBillingSettings';
import { InvoiceService } from '@app/features/billing-v2/services/invoice.service';
import { MatterBillingSettingsService } from '@app/shared/_services/matter-billing-settings-service/matter-billing-settings.service';
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

  constructor(
    private matterBillingSettingsService: MatterBillingSettingsService,
    private invoiceService: InvoiceService,
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

  submit(): void {
    // handle the flat rate invoice automation
    if (this.billingSettings.billing_type === 'flatrate') {
      // if their is a split, there will be two invoices generated
      // the intial due date is always 30 days from today
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

        this.invoiceService.upsert(initialInvoice).subscribe((intial) => {
          console.log('initial invoice', intial);
        });
        this.invoiceService.upsert(finalInvoice).subscribe((final) => {
          console.log('final invoice', final);
        });
      }
      // if not split
      else {
      }
    }
  }
}
