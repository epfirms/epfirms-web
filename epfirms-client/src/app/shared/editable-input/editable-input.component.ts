import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss'],
  host: {
    class: 'relative flex items-center',
  },
})
export class EditableInputComponent implements OnInit {
  private _value: string = '';

  get value(): string {
    return this._value;
  }
  
  @Input() set value(val: string) {
    if (val) {
      this._value = val;
    }
  };

  @Input() placeholder: string = '';

  @Input() enterKey: boolean = false;

  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('inputField') inputElement;

  constructor() {}

  ngOnInit(): void {}

  onEnter() {
    this.inputElement.nativeElement.blur();
  }
  
  emitChange() {
    if (this.value !== this.inputElement.nativeElement.value) {
      this.onChange.emit(this.inputElement.nativeElement.value);
    }
  }
}
