import { Component, Input, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.component.html',
  styleUrls: ['./financial-summary.component.scss']
})
export class FinancialSummaryComponent implements OnInit {

  @Input() matter: Matter;

  constructor() { }

  ngOnInit(): void {
  }

}
