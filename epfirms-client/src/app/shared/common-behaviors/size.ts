import { ElementRef } from "@angular/core";
import { AbstractConstructor, Constructor } from "./constructor";

export interface HasSizeAttr {
    size: SizeOptions;

    defaultSize: SizeOptions | undefined;
}

type HasSizeCtor = Constructor<HasSizeAttr> & AbstractConstructor<HasSizeAttr>;

export interface HasElementRef {
    _elementRef: ElementRef;
}

export type SizeOptions = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export function mixinSize<T extends AbstractConstructor<HasElementRef>> (base: T, defaultSize?: SizeOptions): HasSizeCtor & T;

export function mixinSize<T extends Constructor<HasElementRef>> (
    base: T,
    defaultSize?: SizeOptions
): HasSizeCtor & T {
    return class extends base {
        private _size: SizeOptions;
        defaultSize = defaultSize;

        get size(): SizeOptions {
            return this._size;
        }
        set size(value: SizeOptions) {
            const size = value || this.defaultSize;

            if (size !== this._size) {
                if (this._size) {
                    this._elementRef.nativeElement.classList.remove(`ep-${this._size}`);
                } 
                if (size) {
                    this._elementRef.nativeElement.classList.add(`ep-${size}`);
                }

                this._size = size;
            }
        }

        constructor(...args: any[]) {
            super(...args);

            this.size = defaultSize;
        }
    }
}