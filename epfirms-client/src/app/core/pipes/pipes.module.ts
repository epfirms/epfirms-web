import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from './initials/initials.pipe';
import { SearchPipe } from './search/search.pipe';
import { TimeAgoPipe } from './time-ago/time-ago.pipe';
import { PhonePipe } from './phone/phone.pipe';

@NgModule({
  declarations: [
    InitialsPipe,
    SearchPipe,
    TimeAgoPipe,
    PhonePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InitialsPipe,
    SearchPipe,
    TimeAgoPipe,
    PhonePipe
  ]
})
export class PipesModule { }
