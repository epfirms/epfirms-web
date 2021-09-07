import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: '[tab-body]',
  preserveWhitespaces: false,
  templateUrl: './tab-body.component.html',
  styleUrls: ['./tab-body.component.scss'],
  host: {
    'class': 'bg-white flex h-full',
    '[class.h-full]': 'active',
    '[attr.tabindex]': 'active ? 0 : -1',
  }
})
export class TabBodyComponent {
  @Input() content: TemplateRef<void> | null = null;
  @Input() active = false;
}
