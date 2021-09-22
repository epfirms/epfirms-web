import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Inject, InjectionToken, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { TabDirective } from '../tab.directive';

export const TAB_SET = new InjectionToken<any>('TAB_SET');

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnChanges, OnDestroy {

  @Input() title: string = '';
  @Output() readonly select = new EventEmitter<void>();
  @Output() readonly deselect = new EventEmitter<void>();
  @Output() readonly click = new EventEmitter<void>();

  @ContentChild(TabDirective, { static: false, read: TemplateRef }) template: TemplateRef<void> | null = null;
  @ViewChild('contentTemplate', { static: true }) contentTemplate!: TemplateRef<any>;

  isActive: boolean = false;
  position: number | null = null;
  origin: number | null = null;
  readonly stateChanges = new Subject<void>();
  get content(): TemplateRef<any> {
    return this.template || this.contentTemplate;
  }

  get label(): string | TemplateRef<any> {
    return this.title;
  }

  constructor(@Inject(TAB_SET) public closestTabSet: any) {}

  ngOnChanges(changes: SimpleChanges) {
    const {title} = changes;

    if (title) {
      this.stateChanges.next();
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }
}
