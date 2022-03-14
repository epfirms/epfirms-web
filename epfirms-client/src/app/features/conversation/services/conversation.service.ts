import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as ConversationActions from '../store/conversation.actions';
import { Store } from '@ngrx/store';
import {
  Client as ConversationsClient,
  Conversation,
} from '@twilio/conversations';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  from,
  fromEvent,
  Observable,
  pluck,
  Subject,
  take,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root'
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

  protected destroy$ = new Subject<void>();

  constructor(private _http: HttpClient, private _store: Store<{ currentUser: any }>) {}

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
    return fromEvent(this.conversationsClient, 'connectionStateChanged');
  }

  /** Creates a conversation and adds the creator as participant. Direct messages are between 2 users. */
  createConversation(conversationType: 'direct' | 'group' = 'direct'): Observable<any> {
    return from(
      this.conversationsClient.createConversation({ attributes: { type: conversationType } }),
    ).pipe(
      tap((conversation) => {
        this.addParticipant(conversation, conversation.createdBy).subscribe();
      }),
    );
  }

  /** Adds a participant to a conversation.
   * TODO: Limit to 2 users when conversation 'type' attribute is 'direct'.
   */
  addParticipant(conversation, identity: string): Observable<any> {
    return from(this.conversationsClient.getUser(identity)).pipe(
      concatMap((user) => {
        console.log(user);
        return from(conversation.add(identity, { friendlyName: user.friendlyName }));
      }),
      catchError((err) => {
        if (err.message === 'Not Found') {
          return this.createUser(identity).pipe(
            concatMap((response) => {
              return from(conversation.add(identity, { friendlyName: response.data.friendlyName }));
            }),
          );
        }
        throw err;
      }),
    );
  }

  /** Create a twilio user. Identity should be epfirm's user id. */
  createUser(identity): Observable<any> {
    return this._http.post('/api/chat', { identity });
  }

  /** Send message to conversation. */
  sendMessage(conversation, message: string): Observable<any> {
    return from(conversation.sendMessage(message));
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
      return from(this.conversationsClient.shutdown());
    }
    this.destroy$.next();
    this.destroy$.complete();
    return true;
  }

  /** Emits data from 'conversationJoined' event. */
  conversationJoined() {
    this.conversationsClient.on('conversationJoined', (conversation) => {
      this.conversations$.next([...this.conversations$.value, conversation]);
    });
  }

  conversationUpdate() {
    return fromEvent(this.conversationsClient, 'conversationUpdated');
  }

  connectionError() {
    return fromEvent(this.conversationsClient, 'connectionError');
  }

  pushNotification() {
    return fromEvent(this.conversationsClient, 'pushNotification');
  }

  /** Dispatch action when token is about to expire (<3 min until expiration). */
  tokenAboutToExpire() {
    this.conversationsClient.on('tokenAboutToExpire', () => {
      this._store.dispatch(ConversationActions.updateAccessToken());
    });
  }

  /** Dispatch action when token is expired. */
  tokenExpired() {
    this.conversationsClient.on('tokenExpired', () => {
      this._store.dispatch(ConversationActions.updateAccessToken());
    });
  }

  /** Updates friendlyName and profileImage for logged-in user. */
  syncUserProfile() {
    const currentUser$ = this._store.select('currentUser');
    currentUser$.pipe(take(1), pluck('user')).subscribe((user) => {
      this.updateUserFriendlyName(user.full_name).subscribe();
      this.updateUserAttributes(user.profile_image).subscribe();
    });
  }}
