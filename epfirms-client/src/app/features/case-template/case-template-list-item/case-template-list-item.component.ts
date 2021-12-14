import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-case-template-list-item',
  templateUrl: './case-template-list-item.component.html',
  styleUrls: ['./case-template-list-item.component.scss']
})
export class CaseTemplateListItemComponent {

  @Input() 
  get template() {
    return this._template;
  }
  set template(value) {
    this._template = value;
  }

  @Output() editTemplate: EventEmitter<any> = new EventEmitter<any>();

  @Output() deleteTemplate: EventEmitter<any> = new EventEmitter<any>();

  private _template;

  constructor() { }

  edit(): void {
    this.editTemplate.emit();
  }

  delete(): void {
    this.deleteTemplate.emit();
  }
}
