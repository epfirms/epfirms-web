import { User } from "@app/features/user/interfaces/user";

export class Invoice {
    id?: number;
    user_id: number;
    firm_id: number;
    matter_id: number;
    invoice_id: string;
    due_date: string;
    description: string;
    status: string;
    total: number;
    hosted_invoice_url: string;
    is_approved: boolean;
    is_client_visible: boolean;
    created_at?: string;
    updated_at?: string;
    user? : User;
    //determines whether or not stripe will automatically advance it through the lifecycle
    auto_advance: boolean;
    client_subscription_id?: number;
    stripe_subscription_id?: string;

    constructor(matterId : number, userId: number, firmId: number, total: number, description: string) {
        this.user_id = userId;
        this.firm_id = firmId;
        this.matter_id = matterId;
        this.invoice_id = "";
        this.due_date = new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)).toUTCString();
        this.description = description;
        this.status = "";
        this.total = total;
        this.hosted_invoice_url = "";
        this.is_approved = false;
        this.is_client_visible = false;
        this.auto_advance = false;
        
    }

    setDate(date: string) {
        this.due_date = date;
    }

    applySentProperties() : void {
        this.is_approved = true;
        this.is_client_visible = true;
    }

    setAutoAdvance(autoAdvance: boolean) {
        this.auto_advance = autoAdvance;
    }

    setStatus(status: string) {
        this.status = status;
    }

    setSubscriptionIDs(customerSubscriptionId: number, stripeSubscriptionId : string) {
        this.client_subscription_id = customerSubscriptionId;
        this.stripe_subscription_id = stripeSubscriptionId;
    }



}