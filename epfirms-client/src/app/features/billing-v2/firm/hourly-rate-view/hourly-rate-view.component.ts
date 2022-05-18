import { Component, OnInit } from '@angular/core';
import { Staff } from '@app/core/interfaces/staff';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';
import { createMask } from '@ngneat/input-mask';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-hourly-rate-view',
  templateUrl: './hourly-rate-view.component.html',
  styleUrls: ['./hourly-rate-view.component.scss'],
})
export class HourlyRateViewComponent implements OnInit {
  // determines if all rows are selected
  isAllSelected: boolean = false;

  staff$: Observable<Staff[]>;
  staff : Staff[];

  //list of staff options for the combobox
  staffOptions = [];

  currencyInputMask = createMask({
    prefix: '$',
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
  });

  constructor(
    private _staffService : StaffService,
  ) {

    this.staff$ = this._staffService.entities$;
  }

  ngOnInit(): void {
    this.staff$.pipe(take(1)).subscribe(s => {
      this.staff = s;
      this.loadStaffOptions();
    });
  }

  private loadStaffOptions() {
    this.staff.forEach(staff => {
      this.staffOptions.push({
        value: staff.id,
        label: staff.user.full_name
      });
    });
  }

  toggleSelectAll() {
    this.isAllSelected = !this.isAllSelected;
  }
}
