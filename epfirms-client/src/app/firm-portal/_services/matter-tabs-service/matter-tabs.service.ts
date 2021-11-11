import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  add,
  expand,
  close,
  toggleExpand,
  clear,
  minimize,
  setSelectedIndex,
} from '@app/store/matter-tabs/matter-tabs.actions';
import { Store } from '@ngrx/store';
import { Tabs } from '@app/_models/tabs';
import { selectedOpenTabs } from '@app/store/matter-tabs/matter-tabs.reducer';

@Injectable({
  providedIn: 'root',
})
export class MatterTabsService {
  tabs$: Observable<Tabs>;

  constructor(private store: Store<{ matterTabs: Tabs }>) {
    this.tabs$ = store.select('matterTabs');
  }

  getOpenTabs() {
    return this.store.select(selectedOpenTabs);
  }

  add(matterId: number) {
    this.store.dispatch(add({ payload: matterId }));
    this.store.dispatch(expand());
  }

  remove(index: number): void {
    this.store.dispatch(close({ payload: index }));
  }

  clear(): void {
    this.store.dispatch(clear());
  }

  toggleExpand(): void {
    this.store.dispatch(toggleExpand());
  }
  
  minimizeTabs(): void {
    this.store.dispatch(minimize());
  }

  setSelectedIndex(index: number): void {
    this.store.dispatch(setSelectedIndex({ payload: index }));
  }
}
