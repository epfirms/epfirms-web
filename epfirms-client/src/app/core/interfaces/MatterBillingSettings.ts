export class MatterBillingSettings {
  id?: number;
  matter_id?: number;
  is_hourly: boolean;
  is_contingency: boolean;
  is_flat_rate: boolean;
  is_monthly: boolean;
  is_insurance: boolean;
  company_name: string;
  policy_holder_name: string;
  policy_number: string;
  claim_number: string;
  insurance_notes: string;
  before_settlement: number;
  after_settlement: number;
  settlement_date: string;
  appeal_amount: number;
  minimum_payment_amount: number;
  minimum_payment_due_date: string;
  split_flat_rate: boolean;
  initial_payment: number;
  final_payment: number;
  flat_rate_amount: number;
  final_payment_due_date: string;
  initial_invoice_message: string;
  final_invoice_message: string;
  retainer_amount: number;
  retainer_invoice_message: string;
  billing_type: string;
  initial_invoice_sent : boolean;

  constructor(matterID) {
    this.matter_id = matterID;
    this.is_hourly = false;
    this.is_contingency = false;
    this.is_flat_rate = false;
    this.is_monthly = false;
    this.is_insurance = false;
    this.company_name = '';
    this.policy_holder_name = '';
    this.policy_number = '';
    this.claim_number = '';
    this.insurance_notes = '';
    this.before_settlement = 0;
    this.after_settlement = 0;
    this.settlement_date = new Date().toISOString(),
    this.appeal_amount = 0;
    this.minimum_payment_amount = 0;
    this.minimum_payment_due_date = new Date().toISOString(),
    this.split_flat_rate = false;
    this.initial_payment = 0;
    this.final_payment = 0;
    this.flat_rate_amount = 0;
    this.final_payment_due_date = new Date().toISOString(),
    this.initial_invoice_message = '';
    this.final_invoice_message = '';
    this.retainer_amount = 0;
    this.retainer_invoice_message = '';
    this.billing_type = 'flatrate';
    this.initial_invoice_sent = false;
  }


  setAllValues(matterBillingSettings: MatterBillingSettings): void {
    this.id = matterBillingSettings.id;
    this.matter_id = matterBillingSettings.matter_id;
    this.is_hourly = matterBillingSettings.is_hourly;
    this.is_contingency = matterBillingSettings.is_contingency;
    this.is_flat_rate = matterBillingSettings.is_flat_rate;
    this.is_monthly = matterBillingSettings.is_monthly;
    this.is_insurance = matterBillingSettings.is_insurance;
    this.company_name = matterBillingSettings.company_name;
    this.policy_holder_name = matterBillingSettings.policy_holder_name;
    this.policy_number = matterBillingSettings.policy_number;
    this.claim_number = matterBillingSettings.claim_number;
    this.insurance_notes = matterBillingSettings.insurance_notes;
    this.before_settlement = matterBillingSettings.before_settlement;
    this.after_settlement = matterBillingSettings.after_settlement;
    this.settlement_date = matterBillingSettings.settlement_date;
    this.appeal_amount = matterBillingSettings.appeal_amount;
    this.minimum_payment_amount = matterBillingSettings.minimum_payment_amount;
    this.minimum_payment_due_date = matterBillingSettings.minimum_payment_due_date;
    this.split_flat_rate = matterBillingSettings.split_flat_rate;
    this.initial_payment = matterBillingSettings.initial_payment;
    this.final_payment = matterBillingSettings.final_payment;
    this.flat_rate_amount = matterBillingSettings.flat_rate_amount;
    this.final_payment_due_date = matterBillingSettings.final_payment_due_date;
    this.initial_invoice_message = matterBillingSettings.initial_invoice_message;
    this.final_invoice_message = matterBillingSettings.final_invoice_message;
    this.retainer_amount = matterBillingSettings.retainer_amount;
    this.retainer_invoice_message = matterBillingSettings.retainer_invoice_message;
    this.billing_type = matterBillingSettings.billing_type;
    this.initial_invoice_sent = matterBillingSettings.initial_invoice_sent;
  }
}
