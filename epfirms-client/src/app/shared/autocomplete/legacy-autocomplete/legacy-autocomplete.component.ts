import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'legacy-autocomplete',
  templateUrl: './legacy-autocomplete.component.html',
  styleUrls: ['./legacy-autocomplete.component.scss']
})
export class LegacyAutocompleteComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  set options(value) {
    this._options = value;
    this.filteredOptions = value;
  };
  get options() {
    return this._options;
  }

  @Input()
  set selectedOptionId(id: number) {
    if (this.options.length) {
      const option = this.options.find(o => o.id === id);
      if (option) {
      this.selectOption(option);
    }
    }
  }

  @Input() addButton: boolean;

  @Input() placeholder: string = '';

  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

  @Output() addButtonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  filteredOptions = [];

  selectedOption: {id:number, full_name: string, profile_image: string} = { id: 0, full_name: '', profile_image: '' };

  displayOptionList = false;

  clickEvent$ = fromEvent(document, 'click');

  clickEventSubscription;

  private _options;

  constructor(private _eref: ElementRef) {}

  ngOnInit(): void {
    this.filteredOptions = [...this.options];
  }

  ngAfterViewInit() {
    this.clickEventSubscription = this.clickEvent$.subscribe((e) => {
      if (!this._eref.nativeElement.contains(e.target)) {
        this.displayOptionList = false;
      }
    });
  }
  ngOnDestroy() {
    this.clickEventSubscription.unsubscribe();
  }

  filterOptions(inputValue) {
    if (!this.displayOptionList) {
      this.displayOptionList = true;
    }
    this.selectedOption = { id: 0, full_name: '', profile_image: '' };
    const { value } = inputValue;
    if (value) {
      this.filteredOptions = this.options.filter((option) => {
        const name = option.full_name.split(' ').join('').toLowerCase();
        return name.includes(value.split(' ').join('').toLowerCase());
      });
    } else {
      this.filteredOptions = this.options;
    }
  }

  selectOption(item) {
    this.displayOptionList = false;
    this.selectedOption = item;
    this.onSelect.emit(item.id);
  }
}