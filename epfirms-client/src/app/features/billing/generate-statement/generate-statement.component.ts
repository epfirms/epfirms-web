import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { emailService } from '@app/shared/_services/email-service/email.service';
import { StatementService } from '@app/shared/_services/statement-service/statement.service';

@Component({
  selector: 'app-generate-statement',
  templateUrl: './generate-statement.component.html',
  styleUrls: ['./generate-statement.component.scss']
})
export class GenerateStatementComponent implements OnInit {

  //bills that are associated with the statement
  @Input() bills : any[];

  @Input() state: boolean;
  @Output() stateChanged = new EventEmitter<boolean>();
  @Input() matter;

  //properties for the new statement
  statementTotal : number = 0;

  //checkbox for sending to client
  sendToClient : boolean = true;
  
  constructor(
    private matterService : MatterService,
    private statementService : StatementService,
    private emailService : emailService
  ) { }

  ngOnInit(): void {
    console.log(this.matter);
    console.log(this.bills);
    this.bills = this.bills.filter(bill => !bill.reconciled);
  }

  toggleCheckbox(bill):void {
    bill.reconciled = !bill.reconciled;
    if (bill.reconciled && !bill.waive) {
      this.statementTotal += bill.amount;
    }
    else if (!bill.waive){
      this.statementTotal -= bill.amount;
    }
    console.log(bill);
    console.log(this.bills);
  }

  close() : void {
    this.state = !this.state;
    this.stateChanged.emit(false);
  }

  submit(): void {
    let statement = {
      firm_id: this.matter.firm_id,
      status: 'UNPAID',
      matter_id: this.matter.id,
      due_date: new Date().toDateString(),
      balance_due: this.statementTotal,
      user_id: this.matter.client.id,
      message: `Statement Generated: ${new Date().toDateString()}`,
      is_approved: true,
      is_client_visible: this.sendToClient
    };

    //send an email to the client letting them know that they have a new
    // statement
    if (this.sendToClient) {
      this.emailService.sendStatementNotifcation(this.matter.client.email).subscribe();

    }

    this.statementService.create(statement).subscribe((res) => {
      
      this.updateBills(res.id);
      
      this.close()
    });
  }

  updateBills(statementId): void {
    this.bills.filter(bill => bill.reconciled).forEach(bill => {
      bill.statement_id = statementId;
      this.matterService.editMatterBillOrPayment(bill).subscribe()
    });
  }

}
