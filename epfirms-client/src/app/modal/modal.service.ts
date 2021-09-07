import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { ModalRef } from './modal-ref';
import { ModalComponent } from './modal/modal.component';

@Injectable()
export class ModalService {

  constructor(private overlay: Overlay, private injector: Injector) {

  }

  public open<R = any, T = any>(
    content: Type<any>,
    data: T,
    options?: {
      type: 'modal' | 'slideOver' | 'slideUp';
    }
  ): ModalRef<R> {
    const configs = this.getDefaultConfigs(options);
    const overlayConfig = this.applyConfigs(configs);
    const overlayRef = this.createOverlay(overlayConfig);
    const modalRef = this.attachModalContent(overlayRef, content, data);
    const injector = this.createInjector(modalRef, this.injector);
    overlayRef.attach(new ComponentPortal(ModalComponent, null, injector));

    return modalRef;
  }

  private getDefaultConfigs(options: any = {type: 'modal'}) {
    switch(options.type) {
      case 'modal':
        return {
          hasBackdrop: true,
          panelClass: ['inline-block', 'align-bottom', 'bg-white', 'rounded-lg', 'text-left', 'overflow-hidden', 'shadow-xl', 'transform', 'transition-all', 'sm:align-middle', 'sm:max-w-xl', 'sm:w-full'],
          backdropClass: [],
          positionStrategy: this.overlay.position()
          .global().centerHorizontally()
          .centerVertically()
        }
      case 'slideOver':
        return {
          hasBackdrop: false,
          panelClass: ['h-full', 'w-screen', 'max-w-2xl', 'flex', ,'flex-col', 'bg-white', 'overflow-y-scroll', 'shadow-xl'],
          positionStrategy: this.overlay.position().global().right("0")
        }
      default:
        return {
          hasBackdrop: true,
          panelClass: ['inline-block', 'align-bottom', 'bg-white', 'rounded-lg', 'text-left', 'overflow-hidden', 'shadow-xl', 'transform', 'transition-all', 'sm:align-middle', 'sm:max-w-xl', 'sm:w-full'],
          backdropClass: [],
          positionStrategy: this.overlay.position()
          .global().centerHorizontally()
          .centerVertically()
        }
    }
  }

  private applyConfigs(configs: any) {
    return new OverlayConfig(configs);
  }

  private createOverlay(config: any) {
    return this.overlay.create(config);
  }

  private attachModalContent<R = any, T = any>(overlayRef: OverlayRef, content: Type<any>, data: T): ModalRef<R, T>{
    return new ModalRef<R, T>(overlayRef, content, data);
  }

  private createInjector(ref: ModalRef, inj: Injector) {
    return Injector.create({providers: [{ provide: ModalRef, useValue: ref }], parent: inj});
  }

    /**
   * Attaches a dialog container to a dialog's already-created overlay.
   * @param overlay Reference to the dialog's underlying overlay.
   * @param config The dialog configuration.
   * @returns A promise resolving to a ComponentRef for the attached container.
   */
    //  private _attachDialogContainer(overlay: OverlayRef, config: any): C {
    //   const injector = Injector.create({
    //     parent:  this.injector,
    //     providers: [{provide: MatDialogConfig, useValue: config}]
    //   });
  
    //   const containerPortal = new ComponentPortal(this._dialogContainerType,
    //       config.viewContainerRef, injector, config.componentFactoryResolver);
    //   const containerRef = overlay.attach<C>(containerPortal);
  
    //   return containerRef.instance;
    // }
}