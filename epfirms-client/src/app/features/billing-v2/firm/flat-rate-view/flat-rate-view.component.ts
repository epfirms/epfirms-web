import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flat-rate-view',
  templateUrl: './flat-rate-view.component.html',
  styleUrls: ['./flat-rate-view.component.scss']
})
export class FlatRateViewComponent implements OnInit {

  isVisible : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }



}
