import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  errorMessage: string = '';

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
      (loginStatus) => {
        this.error = false;

        if (loginStatus.success) {
          if (this.returnUrl) {
            this._router.navigate([this.returnUrl]);
          }

          this.redirectByScope();
        } else if (loginStatus.msg === 'update') {
          this.error = true;
          this.loading = false;
          this.errorMessage = 'The password associated with your account needs to be updated. You have been emailed a link with instructions to reset your password.';
        }
      },
      (error) => {
        this.error = true;
        this.errorMessage = 'Incorrect email or password';
        this.loading = false;
      }
    );
  }

  redirectByScope() {
    this._authService
      .getCurrentUserScope()
      .pipe(
        catchError((err) => {
          this._authService.logout();
          return EMPTY;
        })
      )
      .subscribe((scope) => {
        const { client_access, firm_access } = scope;
        if (client_access.length && firm_access) {
          this._router.navigate(['select'], { relativeTo: this._route });
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
