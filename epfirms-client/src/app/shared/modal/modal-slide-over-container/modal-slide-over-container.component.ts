import { ConfigurableFocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnInit, Optional, Renderer2, ViewChild } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { epSlideOverAnimations } from '../modal-animations';
import { BaseModalContainerComponent } from '../modal-container.directive';
import { ModalOptions } from '../modal-types';

@Component({
  selector: 'app-modal-slide-over-container',
  templateUrl: './modal-slide-over-container.component.html',
  styleUrls: ['./modal-slide-over-container.component.scss'],
  animations: [epSlideOverAnimations.modalContainer],
  host: {
    tabindex: '-1',
    role: 'dialog',
    'class': 'fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16',
    '[class.ep-modal-centered]': 'config.epCentered',
    '[style.zIndex]': 'config.epZIndex',
    '[@modalContainer]': 'state',
    '(@modalContainer.start)': 'onAnimationStart($event)',
    '(@modalContainer.done)': 'onAnimationDone($event)',
    '(click)': 'onContainerClick($event)'
  }
})
export class ModalSlideOverContainerComponent extends BaseModalContainerComponent implements OnInit {
  @ViewChild(CdkPortalOutlet, { static: true }) override portalOutlet!: CdkPortalOutlet;

  @ViewChild('modalElement', { static: true }) override modalElementRef!: ElementRef<HTMLDivElement>;

  constructor(
    ngZone: NgZone,
    host: ElementRef<HTMLElement>,
    focusTrapFactory: ConfigurableFocusTrapFactory,
    cdr: ChangeDetectorRef,
    render: Renderer2,
    overlayRef: OverlayRef,
    public override config: ModalOptions,
    @Optional() @Inject(DOCUMENT) document: any,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) animationType: string
  ) {
    super(ngZone, host, focusTrapFactory, cdr, render, overlayRef, config, document, animationType);
  }

  ngOnInit(): void {
    this.setupMouseListeners(this.modalElementRef);
  }
}

