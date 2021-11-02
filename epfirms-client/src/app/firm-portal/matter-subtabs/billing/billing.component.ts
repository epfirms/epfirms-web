import { Component, Input, OnInit } from '@angular/core';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { ModalService } from '@app/modal/modal.service';
import { BillFormModalComponent } from '@app/shared/bill-form-modal/bill-form-modal.component';
import { PaymentFormModalComponent } from '@app/shared/payment-form-modal/payment-form-modal.component';
import { Matter } from '@app/_models/matter';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
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
  isBillManagerVisible : boolean = false;

  constructor(private _modalService: ModalService, private _matterService: MatterService) {}
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
    // const billModal = this._modalService.open(BillFormModalComponent, {});
    // billModal.afterClosed$.subscribe(({ data }) => {
    //   if (data) {
    //     const bill = {
    //       ...data,
    //       matter_id: this.matter.id
    //     };
    //
    //     if (bill.track_time_for === 'Attorney') {
    //       bill.track_time_for = this.matter.attorney_id;
    //     }
    //
    //     this._matterService.createBillOrPayment(bill).subscribe(() => {
    //       this.loadBillPayments();
    //     });
    //   }
    // });

    this.toggleBillManager();
  }

  addPayment(): void {
    const paymentModal = this._modalService.open(PaymentFormModalComponent, {});
    paymentModal.afterClosed$.subscribe(({ data }) => {
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
  toggleBillManager():void {
    this.isBillManagerVisible = !this.isBillManagerVisible;
  }
}
