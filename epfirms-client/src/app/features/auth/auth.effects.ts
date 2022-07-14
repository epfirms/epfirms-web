import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, switchMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { AuthActions } from './auth.actions';
import { AuthService } from './auth.service';
import { UserService } from '../user/services/user.service';

@Injectable()
export class AuthEffects {
  // idTokenChanged$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.idTokenChanged),
  //     map((authState) => {
  //       if (authState) {
  //         return AuthActions.signInSuccess({ authenticated: !!authState })
  //       }
  //       return AuthActions.signOut()
  //     }),
  //     catchError((error) => of(AuthActions.signInFailure({ error: error.message }))),
  //   ),
  // );

  /**
   * Sign in a user using firebase auth.
   */
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      exhaustMap(({ credential }) =>
        from(this.authService.signIn(credential)).pipe(
          map(() => AuthActions.signInSuccess({ authenticated: true })),
          catchError((error) => of(AuthActions.signInFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  /**
   * Load the current user's profile data on successful sign in.
   */
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInSuccess),
      switchMap(() =>
        this.userService.get('me').pipe(
          map((user) => AuthActions.syncUserProfile({ user })),
          catchError((error) => {
            return of(AuthActions.syncUserProfileFailure({ error: error }))}),
        ),
      ),
    ),
  );

  /**
   * Update the user's firebase profile from latest values in epfirms DB.
   */
  syncUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.syncUserProfile),
      switchMap(({ user }) =>
        this.authService
          .updateUserProfile({
            displayName: user.full_name,
            photoURL: user.profile_image,
          })
          .pipe(
            map(() => AuthActions.syncUserProfileSuccess()),
            catchError((error) => of(AuthActions.syncUserProfileFailure({ error: error.message }))),
          ),
      ),
    ),
  );

  /**
   * Logout of the current firebase auth session.
   */
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      exhaustMap(() =>
        from(this.authService.signOut()).pipe(
          map(() => AuthActions.signOutSuccess()),
          catchError((error) => of(AuthActions.signOutFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
  ) {}
}
