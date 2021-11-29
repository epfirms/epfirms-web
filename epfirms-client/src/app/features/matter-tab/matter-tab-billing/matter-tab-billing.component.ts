import { Component, Input, OnInit } from '@angular/core';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { BillFormModalComponent } from '@app/shared/bill-form-modal/bill-form-modal.component';
import { PaymentFormModalComponent } from '@app/shared/payment-form-modal/payment-form-modal.component';
import { Matter } from '@app/core/interfaces/matter';
import { DialogService } from '@ngneat/dialog';

@Component({
  selector: 'app-matter-tab-billing',
  templateUrl: './matter-tab-billing.component.html',
  styleUrls: ['./matter-tab-billing.component.scss']
})
export class MatterTabBillingComponent implements OnInit {
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

  constructor(private _dialogService: DialogService, private _matterService: MatterService) {}
  ngOnInit(): void {
    this.loadBillPayments();
  }

  loadBillPayments() {
    this._matterService.getMatterBillingById(this.matter.id).subscribe((response) => {
      this.bills = response.filter((b) => b.type === '0');
      this.payments = response.filter((b) => b.type === '1');
    });
  }

  addBill(): void {
    const billModal = this._dialogService.open(BillFormModalComponent, {});
    billModal.afterClosed$.subscribe((data) => {
      if (data) {
        const bill = {
          ...data,
          matter_id: this.matter.id
        };

        if (bill.track_time_for === 'Attorney') {
          bill.track_time_for = this.matter.attorney_id;
        }

        this._matterService.createBillOrPayment(bill).subscribe(() => {
          this.loadBillPayments();
        });
      }
    });
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
}
