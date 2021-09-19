import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getYear } from 'date-fns';
import { DatepickerOptions } from 'ng2-datepicker';
import locale from 'date-fns/locale/en-US';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';

@Component({
  selector: 'editable-datepicker',
  templateUrl: './editable-datepicker.component.html',
  styleUrls: ['./editable-datepicker.component.scss'],
  host: {
    'class': 'relative'
  }
})
export class EditableDatepickerComponent implements OnInit {
  _date: IMyDateModel;
  options: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'mmm d, yyyy',
    alignSelectorRight: true
  };

  @Input() set date(d: string) {
    if (d) {
      this._date = {
        isRange: false,
        singleDate: {
          jsDate: d && d.length ? new Date(d) : null
        }
      }
    } else {
      this._date = null
    }

  };

  @Output() dateChanged = new EventEmitter<Date>();

  constructor() { }

  ngOnInit(): void {
  }
  onDateChanged(event: IMyDateModel): void {
    this.dateChanged.emit(event.singleDate.jsDate)
  }
}
