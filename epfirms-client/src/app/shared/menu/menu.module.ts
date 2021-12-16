import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenuItemsDirective } from './directives/menu-items.directive';
import { MenuButtonDirective } from './directives/menu-button.directive';
import { MenuItemComponent } from './menu-item/menu-item.component';



@NgModule({
  declarations: [
    MenuComponent,
    MenuItemsDirective,
    MenuButtonDirective,
    MenuItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent,
    MenuItemsDirective,
    MenuButtonDirective,
    MenuItemComponent
  ]
})
export class MenuModule { }
