import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion/accordion.component';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { AccordionBodyDirective } from './directives/accordion-body.directive';
import { AccordionHeaderDirective } from './directives/accordion-header.directive';

@NgModule({
  declarations: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionBodyDirective,
    AccordionHeaderDirective
  ],
  imports: [
    CommonModule,
    CdkAccordionModule
  ],
  exports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionBodyDirective,
    AccordionHeaderDirective
  ]
})
export class AccordionModule { }
