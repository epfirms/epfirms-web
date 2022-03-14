import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, filter, take } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectConnectionState } from '@app/features/conversation/store/conversation.store';
import { connect } from '@app/features/conversation/store/conversation.actions';

@Injectable({ providedIn: 'root' })
export class ConversationResolver implements Resolve<any> {
  constructor(private store: Store) {}

  resolve(): Observable<any> | Observable<never> {
    this.store.dispatch(connect());
    const connectionState = this.store.select(selectConnectionState);
    return connectionState.pipe(
      filter((state) => state === 'connected'),
      take(1),
      catchError((err) => {
        console.error('Error connecting to chat client ', err);
        return EMPTY;
      }),
    );
  }
}
