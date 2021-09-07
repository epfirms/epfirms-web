import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tw-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  set twCurrent(value: {start: number, end: number}) {
    this._current = value;
  }
  get twCurrent() {
    return this._current;
  }

  set twPageNumber(value: number) {
    this._pageNumber = value;
  }
  get twPageNumber() {
    return this._pageNumber;
  }

  @Input() 
  set twPageSize(value: number) {
    this._pageSize = value;
  }
  get twPageSize() {
    return this._pageSize;
  }

  @Input() 
  set twTotalSize(value: number) {
    this._length = value;

    if (this.twTotalSize) {
      this.pages = Array(Math.ceil(this.twTotalSize / this.twPageSize)).fill(0).map((x,i)=>i + 1)
    }
  }
  get twTotalSize() {
    return this._length;
  }

  @Output() twCurrentPage: EventEmitter<{start: number, end: number}> = new EventEmitter<{start: number, end: number}>();

  private _current: {start: number, end: number};
  private _pageSize: number;
  private _length: number;
  private _pageNumber: number;
  pages: number[] = [];
  bound: number = 2;

  constructor() { }

  ngOnInit(): void {
    if (!this.twPageNumber) {
      this.twPageNumber = 1;
    }

    this.twCurrent = this.paginate(this.twPageNumber, this.twPageSize);
    this.twCurrentPage.emit(this.twCurrent);
  }

  setPageNumber(page: number) {
    this.twPageNumber = page;
    this.paginate(this.twPageNumber, this.twPageSize);

    this.twCurrent = this.paginate(this.twPageNumber, this.twPageSize);
    this.twCurrentPage.emit(this.twCurrent);
  }

  toggleRest() {
    this.setPageNumber(this.bound + 1);
    this.bound = 1;
  }

  nextPage() {
    
  }

  private paginate(pageNumber: number, pageSize: number): {start: number, end: number} {
    const start: number = (pageNumber - 1) * pageSize;
    const end: number = pageNumber * pageSize;

    return {start, end}
  }
}
