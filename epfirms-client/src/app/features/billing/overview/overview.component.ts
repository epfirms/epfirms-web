import { Component, Input, OnInit } from '@angular/core';
import { ContractService } from '@app/features/contract-builder/contract.service';
import { MatterBillingSettingsService } from '@app/shared/_services/matter-billing-settings-service/matter-billing-settings.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input() matter;
  matterBillingSetting;
  afterSettlement : number = 0;
  beforeSettlement : number = 0;

  //contract for the case if it exists
  contract;

  constructor(
    private matterBillingSettingService : MatterBillingSettingsService,
    private contractService : ContractService
  ) { }

  ngOnInit(): void {
    console.log("MATTER", this.matter);
    this.matterBillingSetting = this.matter.matter_billing_setting;
    this.afterSettlement = this.matterBillingSetting.after_settlement;
    this.beforeSettlement = this.matterBillingSetting.before_settlement;
    this.loadContract();
  }

  submit() : void {
    let setting = {
      matter_id: this.matterBillingSetting.matter_id,
      after_settlement: this.afterSettlement,
      before_settlement: this.beforeSettlement
    }
    
    this.matterBillingSettingService.create(setting).subscribe(res => console.log(res));
  }

  private loadContract() : void {
    this.contractService.getWithMatterId(this.matter.id).subscribe(res => {
      if (res != null){
        this.contract = res;
      }
    })
  }

}
