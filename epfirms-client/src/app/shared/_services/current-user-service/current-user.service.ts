import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  clearCurrentUser,
  loadCurrentUser,
} from '@app/store/current-user/current-user.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  user$: Observable<any>;

  constructor(
    private http: HttpClient,
    private store: Store<{ currentUser: any }>
  ) {
    this.user$ = this.store.select('currentUser');
  }

  load(): Observable<any> {
    return this.http.get('/api/user');
  }

  update(user): Observable<any> {
    return this.http.patch('/api/user', user);
  }

  clear(): void {
    this.store.dispatch(clearCurrentUser());
  }

  getCurrentUser(): Observable<any> {
    return this.user$;
  }

  dispatchLoadCurrentUser(user, scope) {
    this.store.dispatch(loadCurrentUser({ user, scope }));
  }
}
