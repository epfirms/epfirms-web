import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
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
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsetComponent implements AfterContentInit, AfterContentChecked, OnDestroy {
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

  private readonly tabSetId!: number;
  private indexToSelect: number | null = 0;
  private _selectedIndex: number | null = null;
  private _expanded: boolean = false;
  private tabLabelSubscription = Subscription.EMPTY;
  private tabsSubscription = Subscription.EMPTY;

  constructor(private cdr: ChangeDetectorRef) {
    this.tabSetId = nextId++;
  }

  ngOnDestroy(): void {
    this.tabLabelSubscription.unsubscribe();
    this.tabsSubscription.unsubscribe();
  }

  ngAfterContentInit(): void {
    this.subscribeToTabLabels();
    this.subscribeToAllTabChanges();

    // Subscribe to changes in the amount of tabs, in order to be
    // able to re-render the content as new tabs are added or removed.
    this.tabsSubscription = this.tabs.changes.subscribe(() => {
      const indexToSelect = this.clampTabIndex(this.indexToSelect);

      // Maintain the previously-selected tab if a new tab is added or removed and there is no
      // explicit change that selects a different tab.
      if (indexToSelect === this.selectedIndex) {
        const tabs = this.tabs.toArray();

        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].isActive) {
            // Assign both to the `indexToSelect` and `selectedIndex` so we don't fire a changed
            // event, otherwise the consumer may end up in an infinite loop in some edge cases like
            // adding a tab within the `nzSelectedIndexChange` event.
            this.indexToSelect = this.selectedIndex = i;
            break;
          }
        }
      }
      this.subscribeToTabLabels();
      this.cdr.markForCheck();
    });
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

  private subscribeToTabLabels(): void {
    if (this.tabLabelSubscription) {
      this.tabLabelSubscription.unsubscribe();
    }

    this.tabLabelSubscription = merge(...this.tabs.map(tab => tab.stateChanges)).subscribe(() =>
      this.cdr.markForCheck()
    );
  }

  private subscribeToAllTabChanges(): void {
    this.tabs.changes.pipe(startWith(this.tabs)).subscribe((tabs: QueryList<TabComponent>) => {
      this.tabs.reset(tabs.filter(tab => tab.closestTabSet === this));
      this.tabs.notifyOnChanges();
    });
  }
}
