import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, filter, take } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectConnectionState } from '@app/features/conversation/store/conversation.store';
import { ConversationActions } from '@app/features/conversation/store/conversation.actions';
import { AuthService } from '@app/core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class ConversationResolver implements Resolve<any> {
  constructor(private store: Store, private _authService: AuthService) {}

  resolve(): Observable<any> | Observable<never> {
    this.store.dispatch(ConversationActions.Init());
    const connectionState = this.store.select(selectConnectionState);
    return connectionState.pipe(
      filter((state) => state !== 'unknown'),
      take(1),
      catchError((err) => {
        this._authService.logout();
        console.error('Error connecting to chat client ', err);
        return EMPTY;
      }),
    );
  }
}
