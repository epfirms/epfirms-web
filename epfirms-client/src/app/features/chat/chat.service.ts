import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, fromEvent, Observable, of, pluck, Subject, switchMap, tap } from 'rxjs';
import { ChatComponent } from './chat/chat.component';
import { Client as ConversationsClient } from '@twilio/conversations';

export type ClientEvent = 'connectionError' |  'connectionStateChanged' | 'conversationAdded' | 'conversationJoined' | 'conversationLeft' | 'conversationUpdated' | 'messagedAdded' | 'participantJoined' | 'participantLeft' | 'pushNotification';

export type ConnectionState = 'connecting' | 'connected' | 'disconnecting' | 'disconnected' | 'denied';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chatOverlay: OverlayRef;

  conversationsClient: ConversationsClient;

  connectionState: Subject<ConnectionState> = new Subject<ConnectionState>();

  conversation$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  
  constructor(private _overlay: Overlay, private _http: HttpClient) {}
  
  init(): void {
    this.chatOverlay = this._overlay.create({
      disposeOnNavigation: false,
      hasBackdrop: false,
      panelClass: 'chat-overlay',
    });
    const chatPortal = new ComponentPortal(ChatComponent);
    this.chatOverlay.attach(chatPortal);
  }

  getAccessToken(): Observable<any> {
    return this._http.get('api/chat');
  }

  initConversations(): any {
    return this.getAccessToken().pipe(
      pluck('data'),
      switchMap(token => {
        this.conversationsClient = new ConversationsClient(token, {logLevel: 'error'});
        
        // Should be moved to when connectionStateChanged = 'connected'
        this.emitConversationsValue();
        return fromEvent(this.conversationsClient, 'connectionStateChanged');
      }),
      catchError(err => of(err))
    )
  }

  createConversation(conversationType: 'direct' | 'group' = 'direct'): Observable<any> {
    return from(this.conversationsClient.createConversation({attributes: {"type": conversationType, "participants": []}})).pipe(tap((conversation) => {
      this.addParticipant(conversation, conversation.createdBy).subscribe();
    }));
  }

  addParticipant(conversation, identity: string):Observable<any>{
    return from(conversation.add(identity)).pipe(tap(() => {
      // Check both participant values. Might need 
      console.log(conversation.attributes);
      from(conversation.updateAttributes({...conversation.attributes, "participants": [...conversation.attributes.participants, identity]})).subscribe();
    }));
  }

  sendMessage(conversation, message: string): Observable<any> {
    return from(conversation.sendMessage(message));
  }

  getConversations() {
    return from(this.conversationsClient.getSubscribedConversations());
  }

  updateFriendlyName(name: string) {
    return from(this.conversationsClient.user.updateFriendlyName(name))
  }

  emitConversationsValue() {
    this.getConversations().subscribe(async conversations => {
      const items = [...conversations.items];
      while (conversations.hasNextPage) {
        const nextPage = await conversations.nextPage();
        items.push(...nextPage.items);
      }
      this.conversation$.next(items);
    });
  }

  updateUserAttributes(profileImage) {
    return from(this.conversationsClient.user.updateAttributes({"profileImage": profileImage}));
  }

  conversationAddedEvent() {
    return fromEvent(this.conversationsClient, 'conversationAdded');
  }

  conversationUpdateEvent() {
    return fromEvent(this.conversationsClient, 'conversationUpdated');
  }
}
