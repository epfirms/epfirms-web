import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-section',
  templateUrl: './table-section.component.html',
  styleUrls: ['./table-section.component.scss']
})
export class TableSectionComponent {
  @Input()
  set expanded(value: boolean) {
    this._expanded = value;
  }
  get expanded() {
    return this._expanded;
  }

  @Input()
  set title(value: string) {
    this._title = value;
  }
  get title() {
    return this._title;
  }

  private _expanded: boolean = false;
  private _title: string = '';
  constructor() { }

  toggleExpand() {
    
  }
}
