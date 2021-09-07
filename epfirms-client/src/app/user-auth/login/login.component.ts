import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../shared/_services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  loading: boolean = false;

  error: boolean = false;

  returnUrl: string;

  pageLoading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    if (this._authService.accessTokenValue) {
      this.pageLoading = true;
      this.redirectByScope();
    }
  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.returnUrl = this._route.snapshot.queryParams['returnUrl'];
  }

  handleSubmit() {
    this.loading = true;

    this._authService.login(this.loginForm.value).subscribe(
      (loginSuccessful) => {
        this.error = false;

        if (loginSuccessful) {
          if (this.returnUrl) {
            this._router.navigate([this.returnUrl]);
          }

          this.redirectByScope();
        }
      },
      (error) => {
        this.error = true;
        this.loading = false;
      }
    );
  }

  redirectByScope() {
    this._authService.getCurrentUserScope().pipe(
      catchError(err => {
        this._authService.logout();
        return EMPTY
      })
    ).subscribe((scope) => {
      const { client_access, firm_access } = scope;
      if (client_access.length && firm_access) {
        this._router.navigate(['select'], { relativeTo: this._route});
      } else if (client_access.length) {
        this._router.navigate(['client']);
      } else if (firm_access) {
        this._router.navigate(['firm']);
      } else {
        this._authService.logout();
      }
    });
  }
}
