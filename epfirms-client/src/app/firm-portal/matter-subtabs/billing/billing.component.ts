import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '@app/modal/modal.service';
import { BillFormModalComponent } from '@app/shared/bill-form-modal/bill-form-modal.component';
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
  };

  private _matter: Matter;
  
  constructor(private _modalService: ModalService) { }

  ngOnInit(): void {
  }

  addBill(): void {
    const billModal = this._modalService.open(BillFormModalComponent, {});
    billModal.afterClosed$.subscribe(({data}) => {
      console.log(data);
    });
  }
}
