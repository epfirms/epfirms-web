import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'editable-autocomplete',
  templateUrl: './editable-autocomplete.component.html',
  styleUrls: ['./editable-autocomplete.component.scss']
})
export class EditableAutocompleteComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() options;

  @Input() addButton: boolean;

  @Input() placeholder: string = '';

  @Input() set selected(value) {
    if (value) {
    this.selectedOption = {
      id: value.id,
      full_name: value.full_name,
      profile_image: value.profile_image
    };
  }
  }

  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

  @Output() addButtonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  filteredOptions = [];

  selectedOption: {id:number, full_name: string, profile_image: string} = { id: 0, full_name: '', profile_image: '' };

  displayOptionList = false;

  clickEvent$ = fromEvent(document, 'click');

  clickEventSubscription;
  
  constructor(private _eref: ElementRef) { }


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
