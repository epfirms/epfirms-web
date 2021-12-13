import { Component, Input, OnInit } from '@angular/core';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { BillFormModalComponent } from '@app/shared/bill-form-modal/bill-form-modal.component';
import { PaymentFormModalComponent } from '@app/shared/payment-form-modal/payment-form-modal.component';
import { StatementService } from '@app/shared/_services/statement-service/statement.service';
import { Matter } from '@app/core/interfaces/matter';
import { DialogService } from '@ngneat/dialog';

@Component({
  selector: 'app-matter-tab-billing',
  templateUrl: './matter-tab-billing.component.html',
  styleUrls: ['./matter-tab-billing.component.scss']
})
export class MatterTabBillingComponent implements OnInit {
  statements: any[] = [];

  @Input()
  get matter() {
    return this._matter;
  }
  set matter(value: Matter) {
    this._matter = value;
  }

  private _matter: Matter;

  bills: any[] = [];
  payments: any[] = [];

  //CONFIG FOR BILL MANAGER SLIDE OVER
  isBillManagerVisible: boolean = false;
  isBillManagerEditMode: boolean = false;
  currentBill;

  //CONFIG FOR STATEMENT MANAGER
  isStatementManagerVisible: boolean = false;
  currentStatement;

  constructor(private _dialogService: DialogService, private _matterService: MatterService,
    private statementService: StatementService) { }
  ngOnInit(): void {
    this.loadBillPayments();
    this.loadStatements();
    console.log(this.payments);

  }

  loadBillPayments() {
    this._matterService.getMatterBillingById(this.matter.id).subscribe((response) => {
      this.bills = response.filter((b) => b.type === '0');
      this.payments = response.filter((b) => b.type === '1');
    });
  }

  addBill(): void {
    // addBill(): void {
    //   const billModal = this._dialogService.open(BillFormModalComponent, {});
    //   billModal.afterClosed$.subscribe((data) => {
    //     if (data) {
    //       const bill = {
    //         ...data,
    //         matter_id: this.matter.id
    //       };

    this.toggleBillManager();
  }

  addPayment(): void {
    const paymentModal = this._dialogService.open(PaymentFormModalComponent, {});
    paymentModal.afterClosed$.subscribe((data) => {
      console.log(data);
      if (data) {
        const bill = {
          ...data,
          matter_id: this.matter.id
        };
        this._matterService.createBillOrPayment(bill).subscribe(() => {
          this.loadBillPayments();
        });
      }
    });
  }

  remove(id: number) {
    this._matterService.removeMatterBill(id).subscribe(() => {
      this.loadBillPayments();
    });
  }

  //method for toggling visibility of bill manager
  toggleBillManager(): void {
    this.isBillManagerVisible = !this.isBillManagerVisible;
  }

  editBill(bill): void {
    this.isBillManagerEditMode = true;
    this.currentBill = bill;
    this.toggleBillManager();
  }

  clearEditMode(): void {
    this.isBillManagerEditMode = false;
    this.currentBill = null;
  }

  // STATEMENT GENERATION CODE
  generateStatement(): void {
    // get the bills for the month
    let monthlyBills = this.bills.filter(bill => new Date().getMonth() === new Date(bill.date).getMonth())
    console.log(monthlyBills)
    let balance = 0;
    monthlyBills.forEach(bill => {
      balance += parseFloat(bill.amount);
    });

    console.log(balance);
    console.log(this.matter)
    let date = new Date();
    date.setDate(date.getDate() + 30);

    let statement = {
      firm_id: this.matter.firm_id,
      status: "UNPAID",
      matter_id: this.matter.id,
      due_date: date.toDateString(),
      balance_due: balance,
      user_id: this.matter.attorney_id,
      message: `Statement Generated: ${new Date().toDateString()}`
    }

    this.statementService.create(statement).subscribe(res => {
      console.log(res);
      monthlyBills.forEach(bill => {
        bill.statement_id = res.id;
        this._matterService.editMatterBillOrPayment(bill).subscribe();
        this.loadStatements();
      });
    });

  }


  // EOSTATEMENT GENERATION CODE

  // load all statements for the matter
  loadStatements(): void {
    this.statementService.getAllByMatterId(this.matter.id).subscribe(res => {
      console.log(res);
      this.statements = res;
    });
  }

  deleteStatement(id): void {
    this.statementService.delete(id).subscribe(res => this.loadStatements());
  }

  //statement manager helper methods
  toggleStatementManager(statement): void {
    this.isStatementManagerVisible = !this.isStatementManagerVisible;
    this.currentStatement = statement;
  }

  download(statement): void {


    let csvContent = "data:text/csv;charset=utf-8,"

    csvContent += "Employee ID, Employee Name, Hourly Rate, Hours, Amount, Description, Billing Type, Payment Type\n"

    this.bills.filter(bill => bill.statement_id == statement.id).forEach(bill => {
      csvContent += `${bill.track_time_for},${bill.employee_name},${bill.hourly_rate},${bill.hours}, ${bill.amount},${bill.description},${bill.billing_type},${bill.payment_type}\n`
    });

    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }




  //----------------------
}
