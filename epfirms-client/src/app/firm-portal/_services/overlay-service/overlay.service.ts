import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(
    private _appRef: ApplicationRef,
    private _resolver: ComponentFactoryResolver,
    private _injector: Injector
) { }

private _components: ComponentRef<any>[] = [];

add<T>(
    component,
    element?: Element | string
) {
    const componentRef = component instanceof ComponentRef
        ? component
        : this._resolver.resolveComponentFactory(component).create(this._injector);
    this._appRef.attachView(componentRef.hostView);
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    if (!element) {
        element = document.body;
    }
    element.appendChild(
        (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement
    );
    this._components.push(componentRef);
    return componentRef;
}

remove(dialog: number | ComponentRef<any>): boolean {
    let componentRef;
    if (typeof dialog === 'number' && this._components.length > dialog)  {
        componentRef = this._components.splice(dialog, 1)[0];
    }
    else {
        for (const cr of this._components) {
            if (cr === dialog) {
                componentRef = cr;
            }
        }
    }
    if (componentRef) {
        this._remove(componentRef);
        return true;
    }
    return false;
}

private _remove(componentRef: ComponentRef<any>) {
    this._appRef.detachView(componentRef.hostView);
    componentRef.destroy();
}

clear() {
    while (this._components.length > 0) {
        this._remove(this._components.pop());
    }
}

getIndex(componentRef: ComponentRef<any>): number {
    return this._components.indexOf(componentRef);
}
}
