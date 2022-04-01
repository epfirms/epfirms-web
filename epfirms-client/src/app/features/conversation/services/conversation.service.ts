import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as ConversationActions from '../store/conversation.actions';
import { Store } from '@ngrx/store';
import {
  Client as ConversationsClient,
  ConnectionState,
  Conversation,
  Message,
} from '@twilio/conversations';
import {
  BehaviorSubject,
  from,
  fromEvent,
  fromEventPattern,
  Observable,
  pluck,
} from 'rxjs';
import { ConversationState } from '../store/conversation.store';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  /** Twilio conversations client. */
  conversationsClient: ConversationsClient;

  conversations$: BehaviorSubject<Conversation[]> = new BehaviorSubject<Conversation[]>([]);

  /** Accessor for logged-in user's info. Before client initialization, returns an unitialized user.
   *  Triggers ConversationsClient.userUpdated event after initialization. */
  get user() {
    return this.conversationsClient.user;
  }

  constructor(
    private _http: HttpClient,
    private _store: Store<{ conversation: ConversationState; currentUser: any }>,
  ) {}

  /** Retrieves an access token for the client. */
  getAccessToken(): Observable<any> {
    return this._http.get('api/chat');
  }

  updateAccessToken(token: string): Observable<any> {
    return from(this.conversationsClient.updateToken(token));
  }

  /** Initializes client and emits the connection state. */
  init(token: string): Observable<any> {
    this.conversationsClient = new ConversationsClient(token, { logLevel: 'error' });
    return this.connectionStateChanged();
  }

  /** Creates a conversation and adds the creator as participant. Direct messages are between 2 users. */
  createConversation(conversationType: 'direct' | 'group' = 'direct', attributes?: any): Observable<Conversation> {
    return from(
      this.conversationsClient.createConversation({ attributes: { ...attributes, type: conversationType } }),
    );
  }

  sendMessage(conversationSid: string, options: {body: string, author?: string}) {
    return this._http.post(`/api/chat/${conversationSid}/messages`, options);
  }

  /** Adds a participant to a conversation.
   * TODO: Limit to 2 users when conversation 'type' attribute is 'direct'.
   */
  addParticipant(conversation: Conversation, opts): Observable<any> {
    return this._http.post(`/api/chat/${conversation.sid}/participants`, opts);
  }

  /** Create a twilio user. Identity should be epfirm's user id. */
  createUser(identity): Observable<any> {
    return this._http.post('/api/chat', { identity });
  }

  /** Update logged-in user's friendly name. */
  updateUserFriendlyName(name: string) {
    return from(this.conversationsClient.user.updateFriendlyName(name));
  }

  /** Update logged-in user's attributes. */
  updateUserAttributes(attributes: { profileImage?: string }) {
    return from(this.conversationsClient.user.updateAttributes(attributes));
  }

  /** Gracefully closes the client. */
  shutdown() {
    if (this.conversationsClient) {
      this.conversationsClient.removeAllListeners();
    }
    this.conversations$.next([]);
    return true;
  }

  connectionStateChanged() {
    const addHandler = (handler) =>
      this.conversationsClient.onWithReplay('connectionStateChanged', handler);
    const removeHandler = (handler) =>
      this.conversationsClient.removeListener('connectionStateChanged', handler);
    return fromEventPattern(addHandler, removeHandler) as Observable<ConnectionState>;
  }

  setAllMessagesRead(conversation: Conversation) {
    conversation.getUnreadMessagesCount().then((count) => {
      conversation.setAllMessagesRead().then(() => {
        this._store.dispatch(ConversationActions.decreaseUnreadMessageCount({ payload: count }));
      });
    });
  }

  messageAdded() {
    return fromEvent(this.conversationsClient, 'messageAdded') as Observable<Message>;
  }

  conversationJoinedEvent() {
    const addHandler = (handler) => this.conversationsClient.on('conversationJoined', handler);
    return fromEventPattern(addHandler) as Observable<Conversation>;
  }

  connectionError() {
    return fromEvent(this.conversationsClient, 'connectionError');
  }

  /** Dispatch action when token is about to expire (<3 min until expiration). */
  tokenAboutToExpire() {
    return fromEvent(this.conversationsClient, 'tokenAboutToExpire');
  }

  /** Dispatch action when token is expired. */
  tokenExpired() {
    return fromEvent(this.conversationsClient, 'tokenExpired');
  }

  /** Updates friendlyName and profileImage for logged-in user. */
  syncUserProfile() {
    const currentUser$ = this._store.select('currentUser');
    currentUser$.pipe(pluck('user')).subscribe((user) => {
      this.updateUserFriendlyName(user.full_name).subscribe();
      this.updateUserAttributes(user.profile_image).subscribe();
    });
  }
}
