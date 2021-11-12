import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'editable-autocomplete',
  templateUrl: './editable-autocomplete.component.html',
  styleUrls: ['./editable-autocomplete.component.scss']
})
export class EditableAutocompleteComponent implements OnInit {
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

  highlightedIndex: number = 0;
  
  constructor(private _eref: ElementRef) { }


  ngOnInit(): void {
    this.filteredOptions = [...this.options];
    this.highlightedIndex = this.filteredOptions.findIndex(o => o.id === this.selectedOption.id);
  }

  filterOptions(inputValue) {
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
    this.selectedOption = item;
    this.onSelect.emit(item.id);
  }

  handleKeyboardNav(event) {
    if (this.filteredOptions.length) {
    switch(event.key) {
      case 'ArrowDown':
        if (this.highlightedIndex < this.filteredOptions.length - 1) {
        this.highlightedIndex = this.highlightedIndex + 1;
        this.selectedOption = this.filteredOptions[this.highlightedIndex];
      }
        break;
      case 'ArrowUp':
        if (this.highlightedIndex > 0) {
          this.highlightedIndex = this.highlightedIndex - 1;
          this.selectedOption = this.filteredOptions[this.highlightedIndex];
        }
        break;
      case 'Enter':
        this.onSelect.emit(this.selectedOption.id);
        break;
    }
  }
    console.log(event);
    // console.log(event.keyCode);
  }
}
