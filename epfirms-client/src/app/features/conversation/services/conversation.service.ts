import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConversationActions } from '../store/conversation.actions';
import { Store } from '@ngrx/store';
import {
  Client as ConversationsClient,
  ConnectionState,
  Conversation,
  Message,
} from '@twilio/conversations';
import { BehaviorSubject, from, fromEventPattern, merge, Observable, of, pluck, switchMap, take } from 'rxjs';
import { ConversationState } from '../store/conversation.store';
import { HotToastService } from '@ngneat/hot-toast';

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
    private _toastService: HotToastService
  ) {}

  /** Retrieves an access token for the client. */
  getAccessToken(): Observable<any> {
    return this._http.get('api/chat');
  }

  updateAccessToken(token: string): Observable<any> {
    return from(this.conversationsClient.updateToken(token));
  }

  /** Initializes the conversations client. */
  init(token: string): Observable<ConversationsClient> {
    this.conversationsClient = new ConversationsClient(token, { logLevel: 'error' });
    return of(this.conversationsClient);
  }

  /** Creates a conversation and adds the creator as participant. Direct messages are between 2 users. */
  createConversation(
    conversationType: 'direct' | 'group' = 'direct',
    attributes?: any,
  ): Observable<Conversation> {
    return from(
      this.conversationsClient.createConversation({
        attributes: { ...attributes, type: conversationType },
      }),
    );
  }

  sendMessage(conversationSid: string, options: { body: string; author?: string }) {
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

  connectionStateChanged(): Observable<ConnectionState> {
    const addHandler = (handler) =>
      this.conversationsClient.onWithReplay('connectionStateChanged', handler);
    const removeHandler = (handler) =>
      this.conversationsClient.removeListener('connectionStateChanged', handler);
    return fromEventPattern(addHandler, removeHandler) as Observable<ConnectionState>;
  }

  setAllMessagesRead(conversation: Conversation) {
    conversation.getUnreadMessagesCount().then((count) => {
      conversation.setAllMessagesRead().then(() => {
        this._store.dispatch(ConversationActions.DecreaseUnreadMessageCount({ payload: count }));
      });
    });
  }

  messageAdded() {
    const addHandler = (handler) => this.conversationsClient.on('messageAdded', handler);
    const removeHandler = (handler) =>
      this.conversationsClient.removeListener('messageAdded', handler);
    return fromEventPattern(addHandler, removeHandler) as Observable<Message>;
  }

  conversationJoinedEvent() {
    const addHandler = (handler) => this.conversationsClient.on('conversationJoined', handler);
    const removeHandler = (handler) =>
      this.conversationsClient.removeListener('conversationJoined', handler);
    return fromEventPattern(addHandler, removeHandler) as Observable<Conversation>;
  }

  connectionError() {
    const addHandler = (handler) => this.conversationsClient.on('connectionError', handler);
    const removeHandler = (handler) =>
      this.conversationsClient.removeListener('connectionError', handler);
    return fromEventPattern(addHandler, removeHandler);
  }

  /** Dispatch action when token is about to expire (<3 min until expiration). */
  tokenAboutToExpire() {
    const addHandler = (handler) => this.conversationsClient.on('tokenAboutToExpire', handler);
    const removeHandler = (handler) =>
      this.conversationsClient.removeListener('tokenAboutToExpire', handler);
    return fromEventPattern(addHandler, removeHandler);
  }

  /** Dispatch action when token is expired. */
  tokenExpired() {
    const addHandler = (handler) => this.conversationsClient.on('tokenExpired', handler);
    const removeHandler = (handler) =>
      this.conversationsClient.removeListener('tokenExpired', handler);
    return fromEventPattern(addHandler, removeHandler);
  }

  /** Updates friendlyName and profileImage for logged-in user. */
  syncUserProfile(): Observable<any> {
    const currentUser$ = this._store.select('currentUser');
    return currentUser$.pipe(take(1), pluck('user'), switchMap((user) => merge(this.updateUserFriendlyName(user.full_name), this.updateUserAttributes(user.profile_image))));
  }

  createMatterConversation(matterId: number): Observable<any> {
    return this._http.post(`/api/chat/matter`, { matter: matterId }).pipe(
      this._toastService.observe({
        loading: `Creating conversation...`,
        success: () => 'Successfully created conversation!',
        error: () => 'An error occurred. Make sure the client has a valid cell phone number.',
      }),
    );
  }

  async findSmsConversation(cellPhone: string) {
    const result = await this.asyncFind(
      this.conversations$.value,
      async (conversation) => {
        const participants = await conversation.getParticipants();
          return (
            participants.length > 1 &&
            participants.some((p) => p.attributes.phone === cellPhone)
          )
      },
    );

    return result;
  }

  async findChatConversation(id: number) {
    const currentUserIdentity = this.user.identity;

    const result = await this.asyncFind(
      this.conversations$.value,
      async (conversation) => {
        const attributes = conversation.attributes;

        const participants = await conversation.getParticipants();
        return (
          currentUserIdentity !== id.toString() &&
          attributes.type === 'direct' &&
          participants.length > 1 &&
          participants.some((p) => p.identity === currentUserIdentity) &&
          participants.some((p) => p.identity === id.toString())
        );
      },
    );

    return result;
  }

  async asyncFind(arr, callback) {
    const fail = Symbol();
    return (
      await Promise.all(arr.map(async (item) => ((await callback(item)) ? item : fail)))
    ).find((i) => i !== fail);
  }
}
