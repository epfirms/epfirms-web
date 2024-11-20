import { Component } from '@angular/core';
import { AuthActions } from '@app/features/auth/auth.actions';
import { selectAuthenticated } from '@app/features/auth/auth.selectors';
import { AuthService } from '@app/features/auth/auth.service';
import { AuthLoginCredential } from '@app/features/auth/interfaces/auth.interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  authenticated$ = this.store.select(selectAuthenticated);
  
  constructor(
    private store: Store,
    public authService: AuthService
  ) {}

  login(event: AuthLoginCredential) {
    this.store.dispatch(AuthActions.signIn({credential: event}));
  }

  logout() {
    this.store.dispatch(AuthActions.signOut());
  }
}
