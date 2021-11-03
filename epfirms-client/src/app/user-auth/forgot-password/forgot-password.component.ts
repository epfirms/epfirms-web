import { Component, OnInit } from '@angular/core';
import { emailService } from '@app/shared/_services/email-service/email.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  emailAddress: string = '';

  constructor(private _emailService: emailService) { }

  ngOnInit(): void {
  }

  submit(): void {
    this._emailService.sendForgotPasswordEmail(this.emailAddress).subscribe();
  }

}
