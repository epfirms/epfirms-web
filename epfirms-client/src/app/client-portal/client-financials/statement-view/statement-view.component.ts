import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-statement-view',
  templateUrl: './statement-view.component.html',
  styleUrls: ['./statement-view.component.scss']
})
export class StatementViewComponent implements OnInit {

  @Input() statements;
  @Input() isVisible : boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.statements);
  }

  close() : void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

}
