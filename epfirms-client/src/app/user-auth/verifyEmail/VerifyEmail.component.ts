import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/shared/_services/auth-service/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './VerifyEmail.component.html',
  styleUrls: ['./VerifyEmail.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute
  ) { }
  isSuccess: boolean = false;
  token: String
  result: boolean = false;

  ngOnInit(): void {
    this._route.queryParams
      .subscribe(params => {
        this.token = params.token;
      }
    );
    this._authService.verifyEmail(this.token).subscribe(result => {
      this.result = result.success
    });
  }

}
