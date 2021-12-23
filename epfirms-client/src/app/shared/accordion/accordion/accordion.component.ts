import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { AccordionItemComponent } from '../accordion-item/accordion-item.component';

@Component({
  selector: 'ep-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit, AfterContentInit {

  @ContentChildren(AccordionItemComponent, { descendants: true })
  accordionItems: QueryList<AccordionItemComponent> = new QueryList<AccordionItemComponent>();

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void { 
    this.accordionItems.changes.subscribe(i => {
      console.log(i);
    })
  }

}
