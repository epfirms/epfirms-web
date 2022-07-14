import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, filter, take } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectConnectionState } from '@app/features/conversation/store/conversation.store';
import { ConversationActions } from '@app/features/conversation/store/conversation.actions';
import { AuthActions } from '@app/features/auth/auth.actions';

@Injectable({ providedIn: 'root' })
export class ConversationResolver implements Resolve<any> {
  constructor(private store: Store) {}

  resolve(): Observable<any> | Observable<never> {
    this.store.dispatch(ConversationActions.Init());
    const connectionState = this.store.select(selectConnectionState);
    return connectionState.pipe(
      filter((state) => state !== 'unknown'),
      take(1),
      catchError((err) => {
        console.error('Error connecting to chat client ', err);
        this.store.dispatch(AuthActions.signOut());
        return EMPTY;
      }),
    );
  }
}
