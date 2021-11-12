import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TagColor } from '@app/core/interfaces/legal-area-color';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'tw-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit, OnDestroy {
  @Input() twSize: 'small' | 'large' = 'large';

  @Input() color: TagColor;

  @Input() dotColor: TagColor;

  @Input() dot: boolean;

  @Input() rounded: boolean;

  @Input() dropdown: boolean = false;

  @Input() options: any[];

  @Output() dropdownClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() selectedOptionChange: EventEmitter<any> = new EventEmitter<any>();

  showOptions: boolean = false;
  
  clickEvent$ = fromEvent(document, 'click');

  clickEventSubscription;
  
  constructor(private _eref: ElementRef) {
  }

  ngOnInit(): void {
    this.clickEventSubscription = this.clickEvent$.subscribe((e) => {
      if (!this._eref.nativeElement.contains(e.target)) {
        this.showOptions = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.clickEventSubscription.unsubscribe();
  }

  selectOption(option: any) {
    this.selectedOptionChange.emit(option);
    this.showOptions = false;
  }

  toggleOptions() {
    if (this.dropdown) {
      this.showOptions = !this.showOptions;
    }
  }
}
