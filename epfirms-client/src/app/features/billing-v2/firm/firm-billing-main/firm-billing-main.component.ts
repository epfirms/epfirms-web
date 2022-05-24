import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-firm-billing-main',
  templateUrl: './firm-billing-main.component.html',
  styleUrls: ['./firm-billing-main.component.scss']
})
export class FirmBillingMainComponent implements OnInit {

  // state controls the view of the bottom of the component
  state : string = 'flat-rate';

  constructor() { }

  ngOnInit(): void {
  }

  setState(state : string) {
    this.state = state;
  }
  

}
