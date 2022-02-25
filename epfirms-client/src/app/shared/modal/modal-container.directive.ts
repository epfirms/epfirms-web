import { AnimationEvent } from '@angular/animations';
import { ConfigurableFocusTrap, ConfigurableFocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ComponentRef, Directive, ElementRef, EmbeddedViewRef, EventEmitter, NgZone, OnDestroy, Renderer2 } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { FADE_CLASS_NAME_MAP, ZOOM_CLASS_NAME_MAP } from './modal-config';
import { EpModalRef } from './modal-ref';
import { ModalOptions } from './modal-types';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class BaseModalContainerComponent extends BasePortalOutlet implements OnDestroy {
  portalOutlet!: CdkPortalOutlet;

  modalElementRef!: ElementRef<HTMLDivElement>;

  backdropElementRef!: ElementRef<HTMLDivElement>;

  animationStateChanged = new EventEmitter<AnimationEvent>();

  containerClick = new EventEmitter<void>();

  cancelTriggered = new EventEmitter<void>();

  okTriggered = new EventEmitter<void>();

  state: 'void' | 'enter' | 'exit' = 'enter';
  
  document: Document;

  modalRef!: EpModalRef;

  private elementFocusedBeforeModalWasOpened: HTMLElement | null = null;

  private focusTrap!: ConfigurableFocusTrap;

  private mouseDown = false;

  protected destroy$ = new Subject<void>();

  constructor(
    protected ngZone: NgZone,
    protected host: ElementRef<HTMLElement>,
    protected focusTrapFactory: ConfigurableFocusTrapFactory,
    public cdr: ChangeDetectorRef,
    protected render: Renderer2,
    protected overlayRef: OverlayRef,
    public config: ModalOptions,
    document?: any,
    protected animationType?: string
  ) {
    super();
    this.document = document;
   }

   onContainerClick(e: MouseEvent): void {
     if (e.target === e.currentTarget && !this.mouseDown) {
       this.containerClick.emit();
     }
   }

   onCloseClick(): void {
     this.cancelTriggered.emit();
   }

   onOkClick(): void {
     this.okTriggered.emit();
   }

   attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
       if (this.portalOutlet.hasAttached()) {
         
       }
       this.savePreviouslyFocusedElement();
       return this.portalOutlet.attachComponentPortal(portal);
   }

   attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this.portalOutlet.hasAttached()) {
    }
    this.savePreviouslyFocusedElement();
    return this.portalOutlet.attachTemplatePortal(portal);
  }

   getNativeElement(): HTMLElement {
     return this.host.nativeElement;
   }

   private savePreviouslyFocusedElement(): void {
    if (!this.focusTrap) {
      this.focusTrap = this.focusTrapFactory.create(this.host.nativeElement);
    }

    if (this.document) {
      this.elementFocusedBeforeModalWasOpened = this.document.activeElement as HTMLElement;
      if (this.host.nativeElement.focus) {
        this.ngZone.runOutsideAngular(() => Promise.resolve().then(() => this.host.nativeElement.focus()));
      }
    }
  }

  private trapFocus(): void {
    const element = this.host.nativeElement;

    if (this.config.epAutofocus) {
      this.focusTrap.focusInitialElementWhenReady();
    } else {
      const activeElement = this.document.activeElement;
      if (activeElement !== element && !element.contains(activeElement)) {
        element.focus();
      }
    }
  }

  private restoreFocus(): void {
    const toFocus = this.elementFocusedBeforeModalWasOpened as HTMLElement;

    // We need the extra check, because IE can set the `activeElement` to null in some cases.
    if (toFocus && typeof toFocus.focus === 'function') {
      const activeElement = this.document.activeElement as Element;
      const element = this.host.nativeElement;

      if (
        !activeElement ||
        activeElement === this.document.body ||
        activeElement === element ||
        element.contains(activeElement)
      ) {
        toFocus.focus();
      }
    }

    if (this.focusTrap) {
      this.focusTrap.destroy();
    }
  }

  private setEnterAnimationClass(): void {
    const backdropElement = this.backdropElementRef?.nativeElement;
    if (backdropElement) {
      backdropElement.classList.add('ep-to');
      backdropElement.classList.remove('ep-from');
    }

    const modalElement = this.modalElementRef.nativeElement;
    modalElement.classList.add('ep-to');
    modalElement.classList.remove('ep-from');
  }

  private setExitAnimationClass(): void {    
    const backdropElement = this.backdropElementRef?.nativeElement;
    if (backdropElement) {
      backdropElement.classList.remove('ep-entering', 'ep-to');
      backdropElement.classList.add('ep-leaving', 'ep-from');
      backdropElement.classList.add('ep-to');
      backdropElement.classList.remove('ep-from');
    }

    const modalElement = this.modalElementRef.nativeElement;
    modalElement.classList.remove('ep-entering', 'ep-to');
    modalElement.classList.add('ep-leaving', 'ep-from');
    modalElement.classList.add('ep-to');
    modalElement.classList.remove('ep-from');
  }

  private cleanAnimationClass(): void {
    const modalElement = this.modalElementRef.nativeElement;
    modalElement.classList.remove('ep-modal');
    modalElement.classList.remove('ep-entering');
    modalElement.classList.remove('ep-leaving');
    modalElement.classList.remove('ep-from', 'ep-to');
  }

  private setModalTransformOrigin(): void {
    const modalElement = this.modalElementRef.nativeElement;

    this.render.setStyle(modalElement, 'transform-origin', '100%');
  }

  onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'enter') {
      this.trapFocus();
    } else if (event.toState === 'exit') {
      this.restoreFocus();
    }
    // this.cleanAnimationClass();
    this.animationStateChanged.emit(event);
  }

  onAnimationStart(event: AnimationEvent): void {
    if (event.toState === 'enter') {
      this.setEnterAnimationClass();
    } else if (event.toState === 'exit') {
      this.setExitAnimationClass();
    }
    this.animationStateChanged.emit(event);
  }

  startExitAnimation(): void {
    this.state = 'exit';
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected setupMouseListeners(modalContainer: ElementRef<HTMLElement>): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.host.nativeElement, 'mouseup')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          if (this.mouseDown) {
            setTimeout(() => {
              this.mouseDown = false;
            });
          }
        });

      fromEvent(modalContainer.nativeElement, 'mousedown')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.mouseDown = true;
        });
    });
  }
}
