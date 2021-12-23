import { Component, ContentChild, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { AccordionBodyDirective } from '../directives/accordion-body.directive';
import { AccordionHeaderDirective } from '../directives/accordion-header.directive';

@Component({
  selector: 'ep-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss']
})
export class AccordionItemComponent {

  @Output() readonly select = new EventEmitter<void>();

  @Output() readonly deselect = new EventEmitter<void>();

  @Output() readonly click = new EventEmitter<void>();

  @ContentChild(AccordionHeaderDirective, { static: false, read: TemplateRef }) headerTemplate: TemplateRef<void> | null = null;

  @ContentChild(AccordionBodyDirective, { static: false, read: TemplateRef }) bodyTemplate: TemplateRef<void> | null = null;

  @ViewChild('contentTemplate', { static: true }) contentTemplate!: TemplateRef<any>;

  isActive: boolean = false;

  get content(): TemplateRef<any> {
    return this.contentTemplate;
  }

  get header(): TemplateRef<any> {
    return this.headerTemplate;
  }

  get body(): TemplateRef<any> {
    return this.bodyTemplate;
  }
}
