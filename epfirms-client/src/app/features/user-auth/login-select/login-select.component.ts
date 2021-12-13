import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-login-select',
  templateUrl: './login-select.component.html',
  styleUrls: ['./login-select.component.scss'],
})
export class LoginSelectComponent implements OnInit {
  constructor(private _router: Router, private _authService: AuthService) {
    if (!this._authService.accessTokenValue) {
      this.changeRoute('login');
    }
  }

  ngOnInit(): void {}

  changeRoute(route: string) {
    this._router.navigate([route]);
  }
}
