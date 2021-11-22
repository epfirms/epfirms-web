import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'ep-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
  // TODO: Implement ControlValueAccessor to use ngModel/formControlName
  @Input()
  set epValue(value: any) {
    this._epValue = value;
  }
  get epValue() {
    return this._epValue;
  }

  @Input() epOptions: any[] = [];

  @Input() epOptionValueField: string = 'id';

  @Input() epOptionTextField: string = 'text';

  @Input() epPlaceholder: string = 'Select';

  @Output() epValueChange: EventEmitter<any> = new EventEmitter<any>();

  public selectFocused: boolean = false;

  private _epValue: any = null;

  constructor() {}

  public setSelectFocused(isFocused: boolean): void {
    this.selectFocused = isFocused;
  }

  public emitChangedValue(value: any): void {
    this.epValueChange.emit(value);
  }
}
