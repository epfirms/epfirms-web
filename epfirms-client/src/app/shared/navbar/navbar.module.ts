import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { MenuModule } from 'headlessui-angular';
import { AvatarModule } from '../avatar/avatar.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MenuModule, AvatarModule],
  exports: [NavbarComponent]
})
export class NavbarModule {}
