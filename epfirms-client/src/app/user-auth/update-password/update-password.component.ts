import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/shared/_services/auth-service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  
  userId: number;

  decodedToken: string;

  password: string;

  confirmPassword: string;

  queryParamsSubscription: Subscription;

  error: boolean = false;

  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this._route.queryParams.subscribe((params) => {
      let { id, token } = params;
      this.decodedToken = decodeURIComponent(token);
      this.userId = parseInt(id);

      this._authService.verifyPasswordToken(this.userId, token).subscribe((response) => {
        console.log(response);
      },
      (error) => {
        this.error = true;
      })
    });
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  updatePassword(): void {
    this._authService.updatePassword(this.userId, this.decodedToken, this.password).subscribe(success => {
      if (success) {
        this.submitted = true;
        setTimeout(() => {
          this._router.navigate(['login']);
        }, 3000);
      }
    });
  }
}
