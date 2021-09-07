import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getYear } from 'date-fns';
import { DatepickerOptions } from 'ng2-datepicker';
import locale from 'date-fns/locale/en-US';

@Component({
  selector: 'editable-datepicker',
  templateUrl: './editable-datepicker.component.html',
  styleUrls: ['./editable-datepicker.component.scss']
})
export class EditableDatepickerComponent implements OnInit {
  _date: Date;
  options: DatepickerOptions = {
    minYear: getYear(new Date()) - 30, // minimum available and selectable year
    maxYear: getYear(new Date()) + 30, // maximum available and selectable year
    placeholder: '', // placeholder in case date model is null | undefined, example: 'Please pick a date'
    format: 'MMM d, yyyy', // date format to display in input
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: locale, // date-fns locale
    position: 'bottom',
    inputClass: 'datepicker-input', // custom input CSS class to be applied
    calendarClass: 'datepicker-blue', // custom datepicker calendar CSS class to be applied
    scrollBarColor: '#dfe3e9', // in case you customize you theme, here you define scroll bar color
  };
  @Input() set date(d: string) {
    this._date = new Date(d);
  };

  @Output() dateChanged = new EventEmitter<Date>();

  constructor() { }

  ngOnInit(): void {
  }

}
