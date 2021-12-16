import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { AvatarModule } from '../avatar/avatar.module';
import { MenuModule } from '../menu/menu.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, AvatarModule, MenuModule],
  exports: [NavbarComponent]
})
export class NavbarModule {}
