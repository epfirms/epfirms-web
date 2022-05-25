export class Transaction {
  id: number;
  // who the transaction is for
  client_id: number;
  // who in the application creates the transaction
  user_id: number;
  firm_id: number;
  matter_id: number;
  // the id of the related invoice
  invoice_id: number;
  hours: number;
  description: string;
  value: number;
  // 'bill' 'payment'
  type: string;
  //sometimes transactions need to be listed but not applied to a balance
  waived: boolean;
  stripe_invoice_id: number;
  stripe_invoice_item_id: number;


  constructor(clientId : number, userId : number, firmId : number, matterId : number) {
    this.client_id = clientId;
    this.user_id = userId;
    this.firm_id = firmId;
    this.matter_id = matterId;
    this.hours = 0;
    this.description = '';
    this.value = 0;
    this.type = 'bill';
    this.waived = false;

  }
}
