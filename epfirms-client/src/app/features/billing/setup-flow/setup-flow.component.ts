import { Component, Input, OnInit } from '@angular/core';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { CustomerAccountService } from '@app/shared/_services/customer-account.service';
import { MatterBillingSettingsService } from '@app/shared/_services/matter-billing-settings-service/matter-billing-settings.service';
import { StatementService } from '@app/shared/_services/statement-service/statement.service';

@Component({
  selector: 'app-setup-flow',
  templateUrl: './setup-flow.component.html',
  styleUrls: ['./setup-flow.component.scss']
})
export class SetupFlowComponent implements OnInit {

  @Input() matter;

  configuration = {
    billingType: "Flat Rate",
    paymentType: "Private Pay",
    flatRateAmount: 0,
    due_date: '',
    splitFlatRate: "No",
    beforeSettlementAmount: 0,
    afterSettlementAmount: 0,
    offerMonthlyPayments: "No",
    minimumPayment: 0,
    lateFee: 0,
    retainerAmount: 0,
    beforeSettlementPercent : 33,
    afterSettlementPercent: 40,
    generateContract: "Yes",
  }

  triggerHourlyAutomation : boolean = true;
  triggerFlatRateAutomation : boolean = true;

  state = 0;
  
  stateHistory = [];

  isContractComplete : boolean = false;

  constructor(
    private matterBillingSettingService : MatterBillingSettingsService,
    private customerAccountService : CustomerAccountService,
    private statementService : StatementService,
    private matterService : MatterService
  ) { }

  ngOnInit(): void {
    console.log("SETUP FLOW",this.matter);
  }

  setState(next): void {
   this.stateHistory.push(this.state);
   this.state = next;
  }

  initStateSubmit() : void {
    if(this.configuration.billingType === "Flat Rate"){
      this.setState(1)
    }
    else if(this.configuration.billingType === "Hourly"){
      this.setState(3)
    }
    else if(this.configuration.billingType === "Contingency"){
      this.setState(4)
    }
  }

  back(): void {
    this.state = this.stateHistory.pop();
  }

  toggleHourlyAutomation() : void {
    this.triggerHourlyAutomation = !this.triggerHourlyAutomation;
  }

  toggleFlatRateAutomation() : void {
    this.triggerFlatRateAutomation = !this.triggerFlatRateAutomation;
  }

  submit() : void {
    // create the matter billing setting object
    this.submitMatterBillingSetting();
    // create the customer account if the monthly payments are enabled
    this.submitCustomerAccount();
    // generate the flat rate statements and email customer
    this.generateStatements()
    // update the matter
    this.matter.billing_setup = true;
    this.matterService.update(this.matter).subscribe(res => console.log(res));
  }

  private submitMatterBillingSetting() : void {
    let setting = {
      matter_id: this.matter.id,
      billing_type: this.configuration.billingType,
      payment_type: this.configuration.paymentType,
      before_settlement: this.configuration.beforeSettlementPercent,
      after_settlement: this.configuration.afterSettlementPercent,
      retainer_amount: this.configuration.retainerAmount,
      flat_rate_amount: this.configuration.flatRateAmount
    };

    this.matterBillingSettingService.create(setting).subscribe(res => console.log(res));

  }

  private submitCustomerAccount() : void {
    let payment_agreement = this.configuration.offerMonthlyPayments == 'Yes';
    let customerAccount = {
      user_id: this.matter.client.id,
      firm_id : this.matter.firm_id,
      matter_id: this.matter.id,
      payment_agreement: payment_agreement,
      min_payment: this.configuration.minimumPayment,
      late_fee_amount: this.configuration.lateFee,

    }

    this.customerAccountService.upsert(customerAccount).subscribe(res => console.log(res));
  }

  private generateStatements() : void {
    if (this.configuration.billingType === 'Flat Rate'){
      let statement = {
        user_id: this.matter.client.id,
        firm_id : this.matter.firm_id,
        matter_id: this.matter.id,
        status: "UNPAID",
        due_date: this.configuration.due_date,
        balance_due: this.configuration.flatRateAmount,
        message: "Inital Flat Rate Charge",
        is_approved: this.triggerFlatRateAutomation
      }
      this.statementService.create(statement).subscribe(res => console.log(res));
  
    }
    else if (this.configuration.billingType === 'Hourly'){
      let statement = {
        user_id: this.matter.client.id,
        firm_id : this.matter.firm_id,
        matter_id: this.matter.id,
        status: "UNPAID",
        due_date: this.configuration.due_date,
        balance_due: this.configuration.retainerAmount,
        message: "Inital Retainer Charge",
        is_approved: this.triggerHourlyAutomation
      }
      this.statementService.create(statement).subscribe(res => console.log(res));
  
    }
  }

  

  handleContractGeneration() : void {
    if (this.configuration.generateContract == 'Yes'){
      this.setState(7);
    }
    else {
      this.setState(6);
    }
  }

  contractCallback(contractCompleted):void {
    if (contractCompleted){
      this.setState(6);
    }
    else {
      this.back();
    }
  }

  markAsDone(): void {
    this.matter.billing_setup = true;
    this.matterService.update(this.matter).subscribe();
    this.isContractComplete = true;
  }

}
