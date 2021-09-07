import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab/tab.component';
import { TabsetComponent } from './tabset/tabset.component';
import { TabBodyComponent } from './tab-body/tab-body.component';
import { TabDirective } from './tab.directive';



@NgModule({
  declarations: [
    TabComponent,
    TabsetComponent,
    TabBodyComponent,
    TabDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TabComponent,
    TabsetComponent
  ]
})
export class TabsModule { }
