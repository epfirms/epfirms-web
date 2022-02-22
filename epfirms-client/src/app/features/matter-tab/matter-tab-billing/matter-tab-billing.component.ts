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
  defaultBillingStyle : string = "hourly";
  defaultPaymentType : string = "private pay";

  billingSettingOptions : string[] = ["hourly", "flat rate", "contingency"];
  billingPaymentOptions : string[] = ["private pay", "legal insurance"];

  //filters for the bills
  displayReconciled : boolean = false;

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

  //manage the state of the statement generation workflow
  generateStatementState : boolean = false;

  // state for the setup flow
  // this should only happen on the first time somebody opens the billing on this case
  isSetupFlowVisible : boolean = true;

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

  toggleBillFilter() : void {
    this.displayReconciled = !this.displayReconciled;
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
    this.statementService.download(statement.id).subscribe(res => {
      console.log(res);
      const blob = new Blob([res], { type: 'text/csv' });
  const url= window.URL.createObjectURL(blob);
  window.open(url);
    });
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
        billing_type: "hourly",
        payment_type: "private pay"
      }
    }
    this.matter.matter_billing_setting = settings;
    
    this._matterService.update(this.matter).subscribe();
    this._matterBillingSettingsService.create(settings).subscribe(onRes => {
      console.log("This should be updating settings");
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


  toggleGenerateStatement() : void {
    this.generateStatementState = !this.generateStatementState;
  }

  handleStateChange(event): void {
    this.generateStatementState = event;
    this.loadStatements();
  }

  toggleWaive(bill) : void {
    bill.waive = !bill.waive;
    this._matterService.editMatterBillOrPayment(bill).subscribe();
  }

  //----------------------
}
