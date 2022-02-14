import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentType, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, Injector, OnDestroy, Optional, SkipSelf, TemplateRef } from '@angular/core';
import { Subject, Observable, defer, startWith } from 'rxjs';
import { BaseModalContainerComponent } from './modal-container.directive';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { EpModalRef } from './modal-ref';
import { ModalSlideOverContainerComponent } from './modal-slide-over-container/modal-slide-over-container.component';
import { ModalOptions } from './modal-types';

type ContentType<T> = ComponentType<T> | TemplateRef<T> | string;

export function setContentInstanceParams<T>(instance: T, params: Partial<T> | undefined): void {
  Object.assign(instance, params);
}

export function applyConfigDefaults(config: ModalOptions, defaultOptions: ModalOptions): ModalOptions {
  return { ...defaultOptions, ...config };
}

export function isNotNil<T>(value: T): value is NonNullable<T> {
  return typeof value !== 'undefined' && value !== null;
}

@Injectable()
export class EpModalService implements OnDestroy {

  private openModalsAtThisLevel: EpModalRef[] = [];

  private readonly afterAllClosedAtThisLevel = new Subject<void>();

  get openModals(): EpModalRef[] {
    return this.parentModal ? this.parentModal.openModals : this.openModalsAtThisLevel;
  }

  get _afterAllClosed(): Subject<void> {
    const parent = this.parentModal;
    return parent ? parent._afterAllClosed : this.afterAllClosedAtThisLevel;
  }

  readonly afterAllClose: Observable<void> = defer(() =>
    this.openModals.length ? this._afterAllClosed : this._afterAllClosed.pipe(startWith(undefined))
  ) as Observable<void>;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    @Optional() @SkipSelf() private parentModal: EpModalService,
    @Optional() private directionality: Directionality
  ) {}

  create<T, R = any>(config: ModalOptions<T, R>): EpModalRef<T, R> {
    return this.open<T, R>(config.epContent as ComponentType<T>, config);
  }

  closeAll(): void {
    this.closeModals(this.openModals);
  }

  // confirm<T>(options: ModalOptions<T> = {}, confirmType: ConfirmType = 'confirm'): EpModalRef<T> {
  //   if ('epFooter' in options) {
  //   }
  //   if (!('epWidth' in options)) {
  //     options.epWidth = 416;
  //   }
  //   if (!('epMaskClosable' in options)) {
  //     options.epMaskClosable = false;
  //   }

  //   options.epModalType = 'slideOver';
  //   options.epClassName = `ant-modal-confirm ant-modal-confirm-${confirmType} ${options.epClassName || ''}`;
  //   return this.create(options);
  // }

  // info<T>(options: ModalOptions<T> = {}): EpModalRef<T> {
  //   return this.confirmFactory(options, 'info');
  // }

  // success<T>(options: ModalOptions<T> = {}): EpModalRef<T> {
  //   return this.confirmFactory(options, 'success');
  // }

  // error<T>(options: ModalOptions<T> = {}): EpModalRef<T> {
  //   return this.confirmFactory(options, 'error');
  // }

  // warning<T>(options: ModalOptions<T> = {}): EpModalRef<T> {
  //   return this.confirmFactory(options, 'warning');
  // }

  private open<T, R>(componentOrTemplateRef: ContentType<T>, config?: ModalOptions): EpModalRef<T, R> {
    const configMerged = applyConfigDefaults(config || {}, new ModalOptions());
    const overlayRef = this.createOverlay();
    const modalContainer = this.attachModalContainer(overlayRef, configMerged);
    const modalRef = this.attachModalContent<T, R>(componentOrTemplateRef, modalContainer, overlayRef, configMerged);
    modalContainer.modalRef = modalRef;

    this.openModals.push(modalRef);
    modalRef.afterClose.subscribe(() => this.removeOpenModal(modalRef));

    return modalRef;
  }

  private removeOpenModal(modalRef: EpModalRef): void {
    const index = this.openModals.indexOf(modalRef);
    if (index > -1) {
      this.openModals.splice(index, 1);

      if (!this.openModals.length) {
        this._afterAllClosed.next();
      }
    }
  }

  private closeModals(dialogs: EpModalRef[]): void {
    let i = dialogs.length;
    while (i--) {
      dialogs[i].close();
      if (!this.openModals.length) {
        this._afterAllClosed.next();
      }
    }
  }

  private createOverlay(): OverlayRef {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global(),
      disposeOnNavigation: true
    });

    return this.overlay.create(overlayConfig);
  }

  private attachModalContainer(overlayRef: OverlayRef, config: ModalOptions): BaseModalContainerComponent {
    const userInjector = config && config.epViewContainerRef && config.epViewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this.injector,
      providers: [
        { provide: OverlayRef, useValue: overlayRef },
        { provide: ModalOptions, useValue: config }
      ]
    });

    const ContainerComponent =
      config.epModalType === 'slideOver'
        ? // If the mode is `confirm`, use `EpModalConfirmContainerComponent`
          ModalSlideOverContainerComponent
        : // If the mode is not `confirm`, use `EpModalContainerComponent`
          ModalContainerComponent;

    const containerPortal = new ComponentPortal<BaseModalContainerComponent>(
      ContainerComponent,
      config.epViewContainerRef,
      injector
    );
    const containerRef = overlayRef.attach<BaseModalContainerComponent>(containerPortal);

    return containerRef.instance;
  }

  private attachModalContent<T, R>(
    componentOrTemplateRef: ContentType<T>,
    modalContainer: BaseModalContainerComponent,
    overlayRef: OverlayRef,
    config: ModalOptions<T>
  ): EpModalRef<T, R> {
    const modalRef = new EpModalRef<T, R>(overlayRef, config, modalContainer);

    if (componentOrTemplateRef instanceof TemplateRef) {
      modalContainer.attachTemplatePortal(
        new TemplatePortal<T>(componentOrTemplateRef, null!, {
          $implicit: config.epComponentParams,
          modalRef
        } as any)
      );
    } else if (isNotNil(componentOrTemplateRef) && typeof componentOrTemplateRef !== 'string') {
      const injector = this.createInjector<T, R>(modalRef, config);
      const contentRef = modalContainer.attachComponentPortal<T>(
        new ComponentPortal(componentOrTemplateRef, config.epViewContainerRef, injector)
      );
      setContentInstanceParams<T>(contentRef.instance, config.epComponentParams);
      modalRef.componentInstance = contentRef.instance;
    }

    return modalRef;
  }

  private createInjector<T, R>(modalRef: EpModalRef<T, R>, config: ModalOptions<T>): Injector {
    const userInjector = config && config.epViewContainerRef && config.epViewContainerRef.injector;

    return Injector.create({
      parent: userInjector || this.injector,
      providers: [{ provide: EpModalRef, useValue: modalRef }]
    });
  }

  // eslint-disable-next-line @typescript-eslint/default-param-last
  // private confirmFactory<T>(options: ModalOptions<T> = {}, confirmType: ConfirmType): EpModalRef<T> {
  //   if (!('epCancelText' in options)) {
  //     options.epCancelText = null;
  //   }
  //   return this.confirm(options, confirmType);
  // }

  ngOnDestroy(): void {
    this.closeModals(this.openModalsAtThisLevel);
    this.afterAllClosedAtThisLevel.complete();
  }
}
