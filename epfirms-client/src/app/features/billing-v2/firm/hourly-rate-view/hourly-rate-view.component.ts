import { Component, OnInit } from '@angular/core';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-hourly-rate-view',
  templateUrl: './hourly-rate-view.component.html',
  styleUrls: ['./hourly-rate-view.component.scss'],
})
export class HourlyRateViewComponent implements OnInit {
  // determines if all rows are selected
  isAllSelected: boolean = false;

  currencyInputMask = createMask({
    prefix: '$',
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
  });

  constructor() {}

  ngOnInit(): void {}

  toggleSelectAll() {
    this.isAllSelected = !this.isAllSelected;
  }
}
