import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  add,
  expand,
  close,
  toggleExpand,
  clear,
} from '@app/store/matter-tabs/matter-tabs.actions';
import { Store } from '@ngrx/store';
import { Tabs } from '@app/_models/tabs';

@Injectable({
  providedIn: 'root',
})
export class MatterTabsService {
  tabs$: Observable<Tabs>;

  constructor(private store: Store<{ matterTabs: Tabs }>) {
    this.tabs$ = store.select('matterTabs');
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
}
