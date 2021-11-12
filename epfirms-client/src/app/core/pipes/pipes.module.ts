import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from './initials/initials.pipe';
import { SearchPipe } from './search/search.pipe';

@NgModule({
  declarations: [
    InitialsPipe,
    SearchPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InitialsPipe,
    SearchPipe
  ]
})
export class PipesModule { }
