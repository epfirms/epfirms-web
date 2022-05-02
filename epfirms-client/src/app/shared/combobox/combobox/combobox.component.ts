import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Option {
  label: string;
  // ideally this should just be an id of related object
  value: any;
}

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
})
export class ComboboxComponent implements OnInit {
  //optional input that set default selected option
  @Input() defaultValue;

  // options data object that contains more stuff about option
  @Input() data: any;
  // the list of options
  @Input() options: Option[];
  // the output that sends the selected option to the parent component
  @Output() onSelected: EventEmitter<any> = new EventEmitter<any>();
  // the output when it is just typed
  @Output() onTyped: EventEmitter<any> = new EventEmitter<any>();
  // the search term that will be used to filter the list of options
  searchTerm: string = '';

  // the currently selected option
  selectedOption: any;

  // dropdown visibility
  isVisible: boolean = false;

  // list item active on mouseover; inactive on mouseleave
  active: boolean = false;

  // keep a copy of default options to reset to after search or blank search
  defaultOptions: Option[];

  constructor() {}

  ngOnInit(): void {
    this.defaultOptions = this.options;
    this.selectedOption = this.defaultValue;
    this.searchTerm = this.defaultValue;
    console.log('defaultValue', this.defaultValue);
    console.log('oninit', this.selectedOption);
    console.log('oninit', this.searchTerm);
    console.log("options", this.options);
  }

  // this is called when the user selects an option`
  onSelect(option: any) {
    this.selectedOption = option;
    this.searchTerm = this.selectedOption.value;
    this.onSelected.emit(option);
    this.isVisible = false;
    this.options = this.defaultOptions;
  }

  // toggle the dropdown visibility
  toggleDropdown() {
    this.isVisible = !this.isVisible;
  }


  // handle typing in the search
  onSearch(): void {
    this.options = this.options.filter((option) => {
      return option.label.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
    if (this.options.length === 0) {
      this.isVisible = false;
    }
    if (this.searchTerm === '') {
      this.options = this.defaultOptions;
    }

    this.onTyped.emit(this.searchTerm);
  }
}
