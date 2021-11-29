import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ep-paginator',
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
  set epPageSize(value: number) {
    this._pageSize = value;
  }
  get epPageSize() {
    return this._pageSize;
  }

  @Input() 
  set epTotalSize(value: number) {
    this._length = value;

    if (this.epTotalSize) {
      this.pages = Array(Math.ceil(this.epTotalSize / this.epPageSize)).fill(0).map((x,i)=>i + 1)
    }
  }
  get epTotalSize() {
    return this._length;
  }

  @Output() epCurrentPage: EventEmitter<{start: number, end: number}> = new EventEmitter<{start: number, end: number}>();

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

    this.twCurrent = this.paginate(this.twPageNumber, this.epPageSize);
    this.epCurrentPage.emit(this.twCurrent);
  }

  setPageNumber(page: number) {
    this.twPageNumber = page;
    this.paginate(this.twPageNumber, this.epPageSize);

    this.twCurrent = this.paginate(this.twPageNumber, this.epPageSize);
    this.epCurrentPage.emit(this.twCurrent);
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
