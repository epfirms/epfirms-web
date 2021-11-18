import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-manage-statement',
  templateUrl: './manage-statement.component.html',
  styleUrls: ['./manage-statement.component.scss']
})
export class ManageStatementComponent implements OnInit {

  //two way binding for visibility
  @Input() isVisible : boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  //controls visibility
  toggleIsVisible() : void {
    this.isVisible = !this.isVisible;
    this.isVisibleChange.emit(this.isVisible);
  }

}
