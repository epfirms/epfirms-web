import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-case-finance-view',
  templateUrl: './case-finance-view.component.html',
  styleUrls: ['./case-finance-view.component.scss']
})
export class CaseFinanceViewComponent implements OnInit {
  @Input() statements;
  @Input() isVisible : boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
  }

}
