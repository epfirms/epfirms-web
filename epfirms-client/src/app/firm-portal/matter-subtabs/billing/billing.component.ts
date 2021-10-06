import { Component, Input, OnInit } from '@angular/core';
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
  
  constructor() { }

  ngOnInit(): void {
  }

}
