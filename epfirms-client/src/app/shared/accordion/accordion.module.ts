import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { AccordionDirective } from './directives/accordion.directive';
import { AccordionItemHeaderComponent } from './accordion-item-header/accordion-item-header.component';
import { AccordionItemActionDirective } from './directives/accordion-item-action.directive';
import { AccordionItemContentDirective } from './directives/accordion-item-content.directive';
import { AccordionItemDescriptionDirective } from './directives/accordion-item-description.directive';
import { AccordionItemTitleDirective } from './directives/accordion-item-title.directive';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [
    AccordionItemComponent,
    AccordionDirective,
    AccordionItemHeaderComponent,
    AccordionItemActionDirective,
    AccordionItemContentDirective,
    AccordionItemDescriptionDirective,
    AccordionItemTitleDirective,
  ],
  imports: [
    CommonModule,
    CdkAccordionModule,
    PortalModule
  ],
  exports: [
    AccordionItemComponent,
    AccordionDirective,
    AccordionItemHeaderComponent,
    AccordionItemActionDirective,
    AccordionItemContentDirective,
    AccordionItemTitleDirective,
    AccordionItemDescriptionDirective
  ]
})
export class AccordionModule { }
