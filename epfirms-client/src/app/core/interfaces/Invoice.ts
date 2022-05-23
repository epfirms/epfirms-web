export class Invoice {
    id: number;
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
}