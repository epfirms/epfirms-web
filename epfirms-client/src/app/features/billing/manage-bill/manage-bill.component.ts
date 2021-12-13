import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Staff } from '@app/core/interfaces/staff';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-bill',
  templateUrl: './manage-bill.component.html',
  styleUrls: ['./manage-bill.component.scss']
})
export class ManageBillComponent implements OnInit {

  //controls whether the slide over is showing or not
  @Input() isVisible: boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  //EDIT mode: determines if the form is in edit mode for a particular bill
  @Input() isEditMode: boolean;
  @Input() currentBill;
  // matter properties
  @Input() matter;

  // bill form group
  billForm = new FormGroup({
    id: new FormControl(),
    matter_id: new FormControl('', Validators.required),
    amount: new FormControl(0.00),
    // determines if bill or payment 0=bill 1=payment,
    type: new FormControl(0),
    date: new FormControl(new Date(), Validators.required),
    hours: new FormControl(0, Validators.required),
    description: new FormControl(''),
    billing_type: new FormControl('', Validators.required),
    payment_type: new FormControl('', Validators.required),
    hourly_rate: new FormControl(null),
    track_time_for: new FormControl(null, Validators.required),
    employee_name: new FormControl(null, Validators.required),
  });

  //due date
  date = new Date().toString()

  // staff obs and list for getting staff information like default hourly rate
  staff$: Observable<Staff[]>;
  staffList;



  constructor(private _matterService: MatterService,
    private _staffService : StaffService,) {
    this.staff$ = _staffService.entities$;
   }

  ngOnInit(): void {
    console.log("Matter", this.matter);
    console.log(this.currentBill);

    // get staff list from obs
    this.staff$.subscribe(res => {
      this.staffList = res;
    });

    //init some of the bill form values
    this.initializeForm();

    // init for edit mode
    if (this.isEditMode === true) {
      console.log("EDIT MODE");
      this.billForm.patchValue({
        id: this.currentBill.id,
        matter_id: this.currentBill.matter_id,
        amount: this.currentBill.amount,
        // determines if bill or payment 0=bill 1=payment,
        type: this.currentBill.type,
        date: this.currentBill.date,
        hours: this.currentBill.hours,
        description: this.currentBill.description,
        billing_type: this.currentBill.billing_type,
        payment_type: this.currentBill.payment_type,
        hourly_rate: this.currentBill.hourly_rate,
        track_time_for: this.currentBill.track_time_for,
        employee_name: this.currentBill.employee_name
      });
      this.date = this.currentBill.date;
    }

    //patch in the matter_id for the bill
    this.billForm.patchValue({ 'matter_id': this.matter.id });
  }

  closeBillManager(): void {
    this.isVisibleChange.emit(false);
  }

  setDueDate(date): void {
    this.billForm.patchValue({ date: date });
    console.log(this.billForm.value);
  }

  submit(): void {
    if (this.isEditMode) {
      let bill = this.billForm.value;
      console.log("EDITED BILL ", bill);
      this._matterService.editMatterBillOrPayment(bill).subscribe(res => {
        console.log(res);
        this.closeBillManager();
      });
    }
    else {
      let bill = this.billForm.value;
      console.log(bill);
      this._matterService.createBillOrPayment(bill).subscribe(res => {
        console.log(res);
        this.closeBillManager();
      });
    }
  }

  // this is used to prefill some properties on the form from employee information
  // such as hourly_rate
  initializeForm():void {
    this.billForm.patchValue({track_time_for: this.matter.attorney_id, employee_name: this.matter.attorney.full_name})
  }

  calculateAmount(): void {
    this.billForm.patchValue({amount: this.billForm.value.hourly_rate* this.billForm.value.hours})
  }

  //setStaff is used to change the bill assignee, this should prefill eventually
  setStaff(staff): void {
    console.log("staff",staff);
    this.billForm.patchValue({track_time_for: staff.id, employee_name: staff.full_name});
  }
}
