import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { OverlayRef } from '@angular/cdk/overlay';
import { EventEmitter } from '@angular/core';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { BaseModalContainerComponent } from './modal-container.directive';
import { ModalOptions } from './modal-types';

export const enum EpModalState {
  OPEN,
  CLOSING,
  CLOSED,
}

export const enum EpTriggerAction {
  CANCEL = 'cancel',
  OK = 'ok',
}

export class EpModalRef<T = any, R = any> {
  componentInstance: T | null = null;

  result?: R;

  state: EpModalState = EpModalState.OPEN;

  afterClose: Subject<R> = new Subject();

  afterOpen: Subject<void> = new Subject();

  private closeTimeout?: number | any;

  private destroy$ = new Subject<void>();

  constructor(
    private overlayRef: OverlayRef,
    private config: ModalOptions,
    public containerInstance: BaseModalContainerComponent,
  ) {
    containerInstance.animationStateChanged
      .pipe(
        filter((event) => event.phaseName === 'done' && event.toState === 'enter'),
        take(1),
      )
      .subscribe(() => {
        this.afterOpen.next();
        this.afterOpen.complete();
        if (config.epAfterOpen instanceof EventEmitter) {
          config.epAfterOpen.emit();
        }
      });

    containerInstance.animationStateChanged
      .pipe(
        filter((event) => event.phaseName === 'done' && event.toState === 'exit'),
        take(1),
      )
      .subscribe(() => {
        clearTimeout(this.closeTimeout);
        this._finishDialogClose();
      });

    containerInstance.containerClick.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => {
      const cancelable = !this.config.epCancelLoading && !this.config.epOkLoading;
      if (cancelable) {
        this.trigger(EpTriggerAction.CANCEL);
      }
    });

    overlayRef
      .keydownEvents()
      .pipe(
        filter(
          (event) =>
            (this.config.epKeyboard as boolean) &&
            !this.config.epCancelLoading &&
            !this.config.epOkLoading &&
            event.keyCode === ESCAPE &&
            !hasModifierKey(event),
        ),
      )
      .subscribe((event) => {
        event.preventDefault();
        this.trigger(EpTriggerAction.CANCEL);
      });

    containerInstance.cancelTriggered
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.trigger(EpTriggerAction.CANCEL));

    containerInstance.okTriggered
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.trigger(EpTriggerAction.OK));

    overlayRef.detachments().subscribe(() => {
      this.afterClose.next(this.result);
      this.afterClose.complete();
      if (config.epAfterClose instanceof EventEmitter) {
        config.epAfterClose.emit(this.result);
      }
      this.componentInstance = null;
      this.overlayRef.dispose();
    });
  }

  getContentComponent(): T {
    return this.componentInstance as T;
  }

  getElement(): HTMLElement {
    return this.containerInstance.getNativeElement();
  }

  destroy(result?: R): void {
    this.close(result);
  }

  triggerOk(): Promise<void> {
    return this.trigger(EpTriggerAction.OK);
  }

  triggerCancel(): Promise<void> {
    return this.trigger(EpTriggerAction.CANCEL);
  }

  close(result?: R): void {
    if (this.state !== EpModalState.OPEN) {
      return;
    }
    this.result = result;
    this.containerInstance.animationStateChanged
      .pipe(
        filter((event) => event.phaseName === 'start'),
        take(1),
      )
      .subscribe((event) => {
        this.overlayRef.detachBackdrop();
        this.closeTimeout = setTimeout(() => {
          this._finishDialogClose();
        }, event.totalTime + 100);
      });

    this.containerInstance.startExitAnimation();
    this.state = EpModalState.CLOSING;
  }

  updateConfig(config: ModalOptions): void {
    Object.assign(this.config, config);
    this.containerInstance.cdr.markForCheck();
  }

  getState(): EpModalState {
    return this.state;
  }

  getConfig(): ModalOptions {
    return this.config;
  }

  getBackdropElement(): HTMLElement | null {
    return this.overlayRef.backdropElement;
  }

  private async trigger(action: EpTriggerAction): Promise<void> {
    const trigger = { ok: this.config.epOnOk, cancel: this.config.epOnCancel }[action];
    const loadingKey = { ok: 'epOkLoading', cancel: 'epCancelLoading' }[action] as
      | 'epOkLoading'
      | 'epCancelLoading';
    const loading = this.config[loadingKey];
    if (loading) {
      return;
    }
    if (trigger instanceof EventEmitter) {
      trigger.emit(this.getContentComponent());
    } else if (typeof trigger === 'function') {
      const result = trigger(this.getContentComponent());
      this.closeWhitResult(result);
    }
  }

  private closeWhitResult(result: any): void {
    if (result !== false) {
      this.close(result);
    }
  }

  _finishDialogClose(): void {
    this.state = EpModalState.CLOSED;
    this.overlayRef.dispose();
    this.destroy$.next();
  }
}
