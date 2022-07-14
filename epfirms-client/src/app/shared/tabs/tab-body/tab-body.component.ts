import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: '[tab-body]',
  preserveWhitespaces: false,
  templateUrl: './tab-body.component.html',
  styleUrls: ['./tab-body.component.scss'],
  host: {
    'class': 'bg-white flex h-full focus-visible:outline-0',
    '[class.h-full]': 'active',
    '[attr.tabindex]': 'active ? 0 : -1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabBodyComponent {
  @Input() content: TemplateRef<void> | null = null;
  @Input() active = false;
}
