import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthLoginCredential } from '../interfaces/auth.interface';

@Component({
  selector: 'app-auth-login-form',
  templateUrl: './auth-login-form.component.html',
  styleUrls: ['./auth-login-form.component.scss']
})
export class AuthLoginFormComponent {
  @Output() loginCredential: EventEmitter<AuthLoginCredential> = new EventEmitter();

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  emitLoginCredential() {
    const loginCredential = this.loginForm.value as AuthLoginCredential;
    this.loginCredential.emit(loginCredential);
  }
}
