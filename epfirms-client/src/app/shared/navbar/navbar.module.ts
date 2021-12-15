import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { AvatarModule } from '../avatar/avatar.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, AvatarModule],
  exports: [NavbarComponent]
})
export class NavbarModule {}
