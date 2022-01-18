import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';

@Component({
  selector: 'app-monthly-payment',
  templateUrl: './monthly-payment.component.html',
  styleUrls: ['./monthly-payment.component.scss']
})
export class MonthlyPaymentComponent implements OnInit {
  // binding for matter
  @Input()
  get matter() {
    return this._matter;
  }
  set matter(value: Matter) {
    this._matter = value;
  }

  private _matter: Matter;
  constructor() { }

  ngOnInit(): void {
  }

}
