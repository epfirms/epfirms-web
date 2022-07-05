import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-portal-select',
  templateUrl: './auth-portal-select.component.html',
  styleUrls: ['./auth-portal-select.component.scss']
})
export class AuthPortalSelectComponent implements OnInit {

  constructor(private _router: Router, private route: ActivatedRoute, private _authService: AuthService) { }

  ngOnInit(): void {
  }

  changeRoute(route: string) {
    this._router.navigate(['..', route], { relativeTo: this.route });
  }
}
