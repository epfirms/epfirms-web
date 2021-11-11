import { Component, OnInit } from '@angular/core';
import { emailService } from '@app/shared/_services/email-service/email.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  emailAddress: string = '';

  submitted: boolean = false;

  constructor(private _emailService: emailService) {}

  submit(): void {
    this.submitted = true;
    this._emailService.sendForgotPasswordEmail(this.emailAddress).subscribe();
  }
}
