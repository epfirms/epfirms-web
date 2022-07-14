import { Injectable } from '@angular/core';
import { updateProfile, User as FirebaseUser } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EntityCacheDispatcher } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { from, map, merge, Observable, tap } from 'rxjs';
import { AuthActions } from './auth.actions';
import { AuthLoginCredential, AuthNewUser } from './interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get user$(): Observable<FirebaseUser> {
    return this.firebaseAuth.user;
  }

  get idToken$(): Observable<string> {
    return this.firebaseAuth.idToken;
  }

  get idTokenResult$() {
    return this.firebaseAuth.idTokenResult;
  }

  get authState$() {
    return this.firebaseAuth.authState;
  }

  constructor(private firebaseAuth: AngularFireAuth, private store: Store, private entityCacheDispatcher: EntityCacheDispatcher) {
    this.dispatchActions().subscribe();
  }

  createUser(user: AuthNewUser) {
    const { email, password } = user;

    return from(this.firebaseAuth.createUserWithEmailAndPassword(email, password));
  }

  updateUserProfile(
    data: {
      displayName?: string;
      photoURL?: string;
    },
  ): Observable<any> {
    
    return from(this.user$.pipe(map(user => updateProfile(user, data))));
  }

  signIn(loginCredential: AuthLoginCredential) {
    const { email, password } = loginCredential;

    return from(this.firebaseAuth.signInWithEmailAndPassword(email, password));
  }

  signOut() {
    this.entityCacheDispatcher.clearCollections();
    return from(this.firebaseAuth.signOut());
  }

  dispatchActions(): Observable<any> {
    return merge(
      // Emits on signin, signout, refresh.
      this.idToken$.pipe(map((idToken) => {
        return AuthActions.idTokenChanged({ idToken: `${idToken}` })
      }))
    ).pipe(tap((action) => this.store.dispatch(action)));
  }
}
