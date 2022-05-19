export class MatterBillingSettings {
    id? : number;
    matter_id? : number;
    is_hourly : boolean;
    is_contingency : boolean;
    is_flat_rate : boolean;
    is_monthly : boolean;
    is_insurance : boolean;
    company_name : string;
    policy_holder_name : string;
    policy_number : string;
    claim_number : string;
    insurance_notes : string;
    before_settlement : number;
    after_settlement : number;
    settlement_date : string;
    appeal_amount : number;
    minimum_payment_amount : number;
    minimum_payment_due_date : string;
    split_flat_rate : boolean;
    initial_payment: number;
    final_payment: number;
    flat_rate_amount: number;
    final_payment_due_date: string;
    initial_invoice_message: string;
    final_invoice_message: string;
    retainer_amount: number;
    retainer_invoice_message: string;

    constructor(matterID) {
        this.matter_id = matterID;
    }
}