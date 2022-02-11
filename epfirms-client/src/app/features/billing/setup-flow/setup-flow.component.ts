import { Component, Input, OnInit } from '@angular/core';

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
    splitFlatRate: "No",
    beforeSettlementAmount: 0,
    afterSettlementAmount: 0,
    offerMonthlyPayments: "No",
    minimumPayment: 0,
    lateFee: 0,
    retainerAmount: 0,
    contingencyPercent: 0
  }

  triggerHourlyAutomation : boolean = true;
  triggerFlatRateAutomation : boolean = true;

  state = 0;
  
  stateHistory = [];

  constructor() { }

  ngOnInit(): void {
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

  }

}
