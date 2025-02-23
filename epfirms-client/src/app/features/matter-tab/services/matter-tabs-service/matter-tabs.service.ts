import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
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
import { Tabs } from '@app/core/interfaces/tabs';
import { selectedOpenTabs } from '@app/store/matter-tabs/matter-tabs.reducer';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatterTabsComponent } from '../../matter-tabs/matter-tabs.component';

@Injectable({
  providedIn: 'root',
})
export class MatterTabsService {
  tabs$: Observable<Tabs>;

  tabsOverlay: OverlayRef;

  constructor(private store: Store<{ matterTabs: Tabs }>, private overlay: Overlay) {
    this.tabs$ = store.select('matterTabs').pipe(tap(tabs => {
      this.toggleExpandStyle(tabs.expanded);
    }));
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
    if (this.tabsOverlay  && this.tabsOverlay.hasAttached()) {
      this.tabsOverlay.detach();
      this.tabsOverlay.dispose();
    }
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

  init(): void {

    this.tabsOverlay = this.overlay.create({disposeOnNavigation: false, hasBackdrop: false, panelClass: ['right-0', 'left-20', 'lg:left-64', 'bottom-0', 'duration-500', 'ease-in-out', 'matter-tab-overlay', 'bg-gray-100', 'ring-1', 'ring-gray-900/[0.07]', 'shadow-[0_2px_11px_rgba(0,0,0,0.1),0_3px_6px_rgba(0,0,0,0.05)]']});
    const matterTabPortal = new ComponentPortal(MatterTabsComponent);
    this.tabsOverlay.attach(matterTabPortal);
  }

  toggleExpandStyle(isExpanded: boolean){
    if (isExpanded) {
      this.tabsOverlay.addPanelClass('translate-y-0');
      this.tabsOverlay.removePanelClass('translate-y-tabs');
    } else {
      this.tabsOverlay.removePanelClass('translate-y-0');
      this.tabsOverlay.addPanelClass('translate-y-tabs');
    }
  }
}
