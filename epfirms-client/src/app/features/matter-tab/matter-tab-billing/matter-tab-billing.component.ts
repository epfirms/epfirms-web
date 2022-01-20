import { Component, Input, OnInit } from '@angular/core';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { BillFormModalComponent } from '@app/shared/bill-form-modal/bill-form-modal.component';
import { PaymentFormModalComponent } from '@app/shared/payment-form-modal/payment-form-modal.component';
import { StatementService } from '@app/shared/_services/statement-service/statement.service';
import { Matter } from '@app/core/interfaces/matter';
import { DialogService } from '@ngneat/dialog';
import { MatterBillingSettingsService } from '@app/shared/_services/matter-billing-settings-service/matter-billing-settings.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-matter-tab-billing',
  templateUrl: './matter-tab-billing.component.html',
  styleUrls: ['./matter-tab-billing.component.scss'],
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

  totalBilled: number = 0;
  totalPayments: number = 0;
  balance: number;

  //bindings for IOLTA
  ioltaBalance: number = 0;

  //CONFIG FOR BILL MANAGER SLIDE OVER
  isBillManagerVisible: boolean = false;
  isBillManagerEditMode: boolean = false;
  currentBill;

  //CONFIG FOR STATEMENT MANAGER
  isStatementManagerVisible: boolean = false;
  currentStatement;

  // bindings for default billing settings
  // these should load into the matter from MatterBillingSettings
  defaultBillingStyle: string = 'Hourly';
  defaultPaymentType: string = 'Private Pay';

  subTabs: string[] = [
    'overview',
    'bills',
    'payments',
    'statements',
    'monthly payments',
    'insurance',
    'billing settings',
  ];
  selectedTab: any = 'overview';

  constructor(
    private _dialogService: DialogService,
    private _matterService: MatterService,
    private statementService: StatementService,
    private _matterBillingSettingsService: MatterBillingSettingsService,
  ) {}
  ngOnInit(): void {
    this.totalBilled = 0;
    this.totalPayments = 0;
    this.loadBillPayments();
    this.loadStatements();
    console.log(this.payments);

    console.log('MATTER', this.matter);
    //init the default billing settings if applicable
    if (this.matter.matter_billing_setting == null) {
      this.upsertDefaultBillingSettings();
    } else {
      this.defaultBillingStyle = this.matter.matter_billing_setting.billing_type;
      this.defaultPaymentType = this.matter.matter_billing_setting.payment_type;
    }

    //init the iolta balance from matter
    this.ioltaBalance = this.matter.iolta_balance;
  }

  loadBillPayments() {
    this._matterService.getMatterBillingById(this.matter.id).subscribe((response) => {
      this.bills = response.filter((b) => b.type === '0');
      this.payments = response.filter((b) => b.type === '1');
      console.log('BILLs', this.bills);
      // reset the values for total billed and payed to eliminate double amount bug
      this.totalBilled = 0;
      this.totalPayments = 0;
      this.bills.forEach((bill) => (this.totalBilled += bill.amount));
      this.payments.forEach((payment) => (this.totalPayments += payment.amount));
      this.balance = this.totalBilled - this.totalPayments;
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
      console.log('MODal data', data);
      if (data != undefined) {
        const bill = {
          ...data,
          matter_id: this.matter.id,
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
    let monthlyBills = this.bills.filter(
      (bill) => new Date().getMonth() === new Date(bill.date).getMonth(),
    );
    console.log(monthlyBills);
    let balance = 0;
    monthlyBills.forEach((bill) => {
      balance += parseFloat(bill.amount);
    });

    console.log(balance);
    console.log(this.matter);
    let date = new Date();
    date.setDate(date.getDate() + 30);

    let statement = {
      firm_id: this.matter.firm_id,
      status: 'UNPAID',
      matter_id: this.matter.id,
      due_date: date.toDateString(),
      balance_due: balance,
      user_id: this.matter.attorney_id,
      message: `Statement Generated: ${new Date().toDateString()}`,
    };

    this.statementService.create(statement).subscribe((res) => {
      console.log(res);
      monthlyBills.forEach((bill) => {
        bill.statement_id = res.id;
        this._matterService.editMatterBillOrPayment(bill).subscribe();
        this.loadStatements();
      });
    });
  }

  // EOSTATEMENT GENERATION CODE

  // load all statements for the matter
  loadStatements(): void {
    this.statementService.getAllByMatterId(this.matter.id).subscribe((res) => {
      console.log(res);
      this.statements = res;
    });
  }

  deleteStatement(id): void {
    this.statementService.delete(id).subscribe((res) => this.loadStatements());
  }

  //statement manager helper methods
  toggleStatementManager(statement): void {
    this.isStatementManagerVisible = !this.isStatementManagerVisible;
    this.currentStatement = statement;
  }

  download(statement): void {
    let csvContent = 'data:text/csv;charset=utf-8,';

    csvContent += 'Employee ID, Date, Employee Name, Hourly Rate, Hours, Amount, Description\n';

    this.bills
      .filter((bill) => bill.statement_id == statement.id)
      .forEach((bill) => {
        csvContent += `${bill.track_time_for},${new Date(bill.date).toDateString()},${
          bill.employee_name
        },${bill.hourly_rate},${bill.hours}, ${bill.amount},${bill.description}\n`;
      });

    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  //create or apply default billing settings for the matter/case
  upsertDefaultBillingSettings(): void {
    let settings;
    if (this.matter.matter_billing_setting != null) {
      settings = {
        id: this.matter.matter_billing_setting.id,
        matter_id: this.matter.id,
        billing_type: this.defaultBillingStyle,
        payment_type: this.defaultPaymentType,
      };
    } else {
      settings = {
        matter_id: this.matter.id,
        billing_type: 'Hourly',
        payment_type: 'Private Pay',
      };
    }

    this._matterBillingSettingsService.create(settings).subscribe((onRes) => {
      console.log('This should be updating settings');
      console.log(onRes);
    });
  }

  updateIOLTA(): void {
    this.matter.iolta_balance = this.ioltaBalance;
    this._matterService.update(this.matter).subscribe((res) => console.log(res));
  }

  selectTab(tab): void {
    console.log('before', this.selectedTab);
    this.selectedTab = tab;
    console.log('after', this.selectedTab);
  }

  //----------------------
}
