import { Direction } from '@angular/cdk/bidi';
import { EventEmitter, TemplateRef, Type, ViewContainerRef } from '@angular/core';

export type OnClickCallback<T> = (instance: T) => (false | void | {}) | Promise<false | void | {}>;

export type ModalTypes = 'default' | 'slideOver';

export type ConfirmType = 'confirm' | 'info' | 'success' | 'error' | 'warning';

export interface StyleObjectLike {
  [key: string]: string;
}

const noopFun = () => void 0;

export class ModalOptions<T = any, R = any> {
  epCentered?: boolean = false;

  epClosable?: boolean = true;

  epOkLoading?: boolean = false;

  epOkDisabled?: boolean = false;

  epCancelDisabled?: boolean = false;

  epCancelLoading?: boolean = false;

  epNoAnimation?: boolean = false;

  epAutofocus?: 'ok' | 'cancel' | 'auto' | null = 'auto';

  epMask?: boolean;

  epMaskClosable?: boolean;

  epKeyboard?: boolean = true;

  epZIndex?: number = 1000;

  epWidth?: number | string;

  epMaxWidth?: number | string;

  epCloseIcon?: string | TemplateRef<void> = 'close';

  // epOkType?: EpButtonType = 'primary';

  epOkDanger?: boolean = false;

  epModalType?: ModalTypes = 'default';

  epOnCancel?: EventEmitter<T> | OnClickCallback<T> = noopFun;

  epOnOk?: EventEmitter<T> | OnClickCallback<T> = noopFun;

  epComponentParams?: Partial<T>;

  epMaskStyle?: StyleObjectLike;

  epBodyStyle?: StyleObjectLike;

  epWrapClassName?: string;

  epClassName?: string;

  epStyle?: object;

  epTitle?: string | TemplateRef<{}>;

  epFooter?: string | TemplateRef<{}> | null; // Default Modal ONLY

  epCancelText?: string | null;

  epOkText?: string | null;

  epContent?: string | TemplateRef<any> | Type<T>;

  epCloseOnNavigation?: boolean;

  epViewContainerRef?: ViewContainerRef;

  // Template use only
  epAfterOpen?: EventEmitter<void>;

  epAfterClose?: EventEmitter<R>;

  // Confirm
  epIconType?: string = 'question-circle';

  epDirection?: Direction;
}

// export interface ModalButtonOptions<T = any> {
//   label: string;
//   type?: EpButtonType;
//   danger?: boolean;
//   shape?: EpButtonShape;
//   ghost?: boolean;
//   size?: EpButtonSize;
//   autoLoading?: boolean; // Default: true, indicate whether show loading automatically while onClick returned a Promise

//   // [NOTE] "componentInstance" will refer to the component's instance when using Component
//   show?: boolean | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean);
//   loading?: boolean | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean); // This prop CAN'T use with autoLoading=true
//   disabled?: boolean | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean);
//   onClick?(this: ModalButtonOptions<T>, contentComponentInstance?: T): any | Promise<any>;
//   [key: string]: any;
// }