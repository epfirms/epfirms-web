import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';
import { MatterBillingSettings } from '@app/core/interfaces/MatterBillingSettings';
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

  constructor(private matterBillingSettingsService: MatterBillingSettingsService) {}

  ngOnInit(): void {
    this.initBillingSettingsForm();
    this.loadBillingSettings();
  }

  private initBillingSettingsForm(): void {
    this.billingSettings = new MatterBillingSettings(this.matter.id);
  }

  private loadBillingSettings() : void {
    this.matterBillingSettingsService
      .getWithMatterId(this.matter.id)
      .subscribe((matterBillingSetting) => {
        if (matterBillingSetting) {

          this.billingSettings.setAllValues(matterBillingSetting);
        }
      });
  }

  upsertBillingSettings() {
    this.matterBillingSettingsService.create(this.billingSettings).subscribe(res => {
      console.log("billing settings upsert", res);
    });
  }
}
