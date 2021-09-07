import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TabComponent, TAB_SET } from '../tab/tab.component';

let nextId = 0;
@Component({
  selector: 'tabset',
  preserveWhitespaces: false,
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.scss'],
  providers: [
    {
      provide: TAB_SET,
      useExisting: TabsetComponent,
    },
  ],
  host: {
    'class': 'flex flex-col h-screen',
  }
})
export class TabsetComponent implements AfterViewInit, AfterContentChecked, OnDestroy {
  @Input()
  get selectedIndex(): number | null {
    return this._selectedIndex;
  }
  set selectedIndex(value: null | number) {
    this.indexToSelect = value;
  }

  @Input()
  get expanded() {
    return this._expanded;
  }
  set expanded(value: boolean) {
    this._expanded = value;
  }

  @Output() readonly selectedIndexChange: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() readonly close = new EventEmitter<{ index: number }>();
  @Output() readonly add = new EventEmitter<void>();
  @Output() readonly expandedChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @ContentChildren(TabComponent, { descendants: true })
  tabs: QueryList<TabComponent> = new QueryList<TabComponent>();

  private tabSubscription: Subscription;
  private readonly tabSetId!: number;
  private indexToSelect: number | null = 0;
  private _selectedIndex: number | null = null;
  private _expanded: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {
    this.tabSetId = nextId++;
  }

  ngOnDestroy(): void {
    this.tabSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.tabSubscription = this.tabs.changes.subscribe(tab => {
      console.log(tab)
    })
  }

  ngAfterContentChecked(): void {
    // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
    // the amount of tabs changes before the actual change detection runs.
    const indexToSelect = (this.indexToSelect = this.clampTabIndex(
      this.indexToSelect
    ));

    // If there is a change in selected index, emit a change event. Should not trigger if
    // the selected index has not yet been initialized.
    if (this._selectedIndex !== indexToSelect) {
      const isFirstRun = this._selectedIndex == null;

      // Changing these values after change detection has run
      // since the checked content may contain references to them.
      Promise.resolve().then(() => {
        this.tabs.forEach(
          (tab, index) => (tab.isActive = index === indexToSelect)
        );

        if (!isFirstRun) {
          this.selectedIndexChange.emit(indexToSelect);
        }
      });
    }

    // Setup the position for each tab and optionally setup an origin on the next selected tab.
    this.tabs.forEach((tab: TabComponent, index: number) => {
      tab.position = index - indexToSelect;

      // If there is already a selected tab, then set up an origin for the next selected tab
      // if it doesn't have one already.
      if (this._selectedIndex != null && tab.position === 0 && !tab.origin) {
        tab.origin = indexToSelect - this._selectedIndex;
      }
    });

    if (this._selectedIndex !== indexToSelect) {
      this._selectedIndex = indexToSelect;
      this.cdr.markForCheck();
    }
  }

  onClose(index: number, e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.close.emit({ index });
  }

  onAdd(): void {
    this.add.emit();
  }

  onExpand(): void {
    this.expandedChange.emit(!this.expanded);
  }

  private clampTabIndex(index: number | null): number {
    return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
  }

  setSelectedIndex(index: number): void {
    if (!this.expanded) {
      this.onExpand();
    }
    this.selectedIndex = index;
    this.cdr.markForCheck();
    this.selectedIndexChange.emit(index);
  }

  getTabIndex(tab: TabComponent, index: number): number | null {
    return this._selectedIndex === index ? 0 : -1;
  }
}
