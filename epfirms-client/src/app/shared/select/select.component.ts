import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tw-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  showOptions: boolean;

  constructor() { }

  ngOnInit(): void {
  }
  
  toggleOptions() {
    this.showOptions = !this.showOptions;
  }
}
