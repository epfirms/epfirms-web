import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { ChatComponent } from './chat/chat.component';

@Injectable({
  providedIn: 'root',
})
export class ChatOverlayService {
  chatOverlay: OverlayRef;

  constructor(private _overlay: Overlay) {}

  /** Creates an overlay and attaches the overlay chat component. */
  init(): void {
    this.chatOverlay = this._overlay.create({
      disposeOnNavigation: false,
      hasBackdrop: false,
      panelClass: 'chat-overlay',
    });
    const chatPortal = new ComponentPortal(ChatComponent);
    this.chatOverlay.attach(chatPortal);
  }

  /** Detach the chat overlay and cleans up DOM. */
  detachAndDispose(): any {
    this.chatOverlay.detach();
    this.chatOverlay.dispose();
  }
}
