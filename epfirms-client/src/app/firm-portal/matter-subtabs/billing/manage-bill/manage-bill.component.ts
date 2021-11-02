import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-manage-bill',
  templateUrl: './manage-bill.component.html',
  styleUrls: ['./manage-bill.component.scss']
})
export class ManageBillComponent implements OnInit {

  //controls whether the slide over is showing or not
  @Input() isVisible : boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeBillManager(): void {
    this.isVisibleChange.emit(false);
  }

}
