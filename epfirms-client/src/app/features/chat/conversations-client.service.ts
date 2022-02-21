import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client as ConversationsClient } from '@twilio/conversations';
import { catchError, concatMap, from, fromEvent, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversationsClientService {
  /** Twilio conversations client. */
  conversationsClient: ConversationsClient;

  /** Accessor for logged-in user's info. Before client initialization, returns an unitialized user.
   *  Triggers ConversationsClient.userUpdated event after initialization. */
   get user() {
    return this.conversationsClient.user;
  }

  constructor(private _http: HttpClient) {}

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
    return from(this.conversationsClient.shutdown());
  }

  /** Emits data from 'conversationJoined' event. */
  conversationJoined() {
    return fromEvent(this.conversationsClient, 'conversationJoined');
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

  /** Emits when token is about to expire (<3 min until expiration). */
  tokenAboutToExpire() {
    return fromEvent(this.conversationsClient, 'tokenAboutToExpire');
  }

  /** Emits when token is expired. */
  tokenExpired() {
    return fromEvent(this.conversationsClient, 'tokenExpired')
  }
}
