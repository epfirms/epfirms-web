import { ElementRef } from "@angular/core";
import { AbstractConstructor, Constructor } from "./constructor";

export interface HasColorAttr {
    color: ThemePalette;

    defaultColor: ThemePalette | undefined;
}

type HasColorCtor = Constructor<HasColorAttr> & AbstractConstructor<HasColorAttr>;

export interface HasElementRef {
    _elementRef: ElementRef;
}

export type ThemePalette = 'primary' | 'secondary' | 'white';

export function mixinColor<T extends AbstractConstructor<HasElementRef>> (base: T, defaultColor?: ThemePalette): HasColorCtor & T;

export function mixinColor<T extends Constructor<HasElementRef>> (
    base: T,
    defaultColor?: ThemePalette
): HasColorCtor & T {
    return class extends base {
        private _color: ThemePalette;
        defaultColor = defaultColor;

        get color(): ThemePalette {
            return this._color;
        }
        set color(value: ThemePalette) {
            const colorPalette = value || this.defaultColor;

            if (colorPalette !== this._color) {
                if (this._color) {
                    this._elementRef.nativeElement.classList.remove(`ep-${this._color}`);
                } 
                if (colorPalette) {
                    this._elementRef.nativeElement.classList.add(`ep-${colorPalette}`);
                }

                this._color = colorPalette;
            }
        }

        constructor(...args: any[]) {
            super(...args);

            this.color = defaultColor;
        }
    }
}