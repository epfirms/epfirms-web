import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BetaSignupService } from '@app/shared/_services/beta-signup-service/beta-signup.service';
import { createMask } from '@ngneat/input-mask';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  phoneInputMask = createMask('(999) 999-9999');
  // @ViewChild(StripeCardComponent) card: StripeCardComponent;

  // cardOptions: StripeCardElementOptions = {
  //   style: {
  //     base: {
  //       iconColor: '#666EE8',
  //       color: 'rgba(31, 41, 55, 1)',
  //       fontWeight: '300',
  //       fontFamily: '"Inter var", Helvetica, sans-serif',
  //       fontSize: '1rem',
  //       fontSmoothing: 'antialiased',
  //       '::placeholder': {
  //         color: 'rgba(156, 163, 175, 1)'
  //       }
  //     }
  //   }
  // };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  // stripeTest: FormGroup;

  // Temporarily removed for beta signups
  // userForm: FormGroup;
  inviteForm: FormGroup;

  firmName: string = '';

  submitted: boolean = false;

  error: boolean = false;

  constructor(private _fb: FormBuilder, private _stripeService: StripeService, private _authService: AuthService, private _router: Router, private _betaSignupService: BetaSignupService) {}

  ngOnInit(): void {
    this.inviteForm = this._fb.group({
        firm_name: ['', [Validators.required]],
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        phone: ['', [Validators.required]],
      });
    // this.stripeTest = this._fb.group({
    //   firmName: ['', [Validators.required]],
    //   firstName: ['', [Validators.required]],
    //   lastName: ['', [Validators.required]],
    //   email: ['', [Validators.required]],
    //   password: ['', [Validators.required]],
    //   cardholder: ['', [Validators.required]],
    //   cardholderAddress: ['', [Validators.required]],
    // });

    // Temporarily removed for beta signups
    // this.userForm = this._fb.group({
    //   first_name: ['', [Validators.required]],
    //   last_name: ['', [Validators.required]],
    //   email: ['', [Validators.required]],
    //   password: ['', [Validators.required]],
    // });
  }

  /*createToken(): void {
    const name = this.stripeTest.get('name').value;
    this._stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          // this._authService.createSubscription({
          //   email: "jaer.rq@gmail.com",
          //   password: "ABoriy78",
          // }, {
          //   name: "Q Firm",
            
          // }, result.token.id).subscribe();
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }*/

  // Temporarily removed for beta signups
  // handleSubmit(): void {
  //   this._authService.createFirm({
  //     name: this.firmName
  //   }, this.userForm.value).subscribe(response => {
  //     this.submitted = true;
  //     setTimeout(() => {
  //       this._router.navigate(['login']);
  //     }, 5000)
  //   },
  //   (error) => {
  //     this.submitted = true;
  //     this.error = true;
  //     setTimeout(() => {
  //       this._router.navigate(['login']);
  //     }, 5000)
  //   });
  // }

  handleInviteSubmit(): void {
    this._betaSignupService.signup(this.inviteForm.value).subscribe(res => {
      this.submitted = true;
      setTimeout(() => {
        this._router.navigate(['login']);
      }, 10000);
    });
    // this._authService.createFirm({
    //   name: this.firmName
    // }, this.userForm.value).subscribe(response => {
    //   this.submitted = true;
    //   setTimeout(() => {
    //     this._router.navigate(['login']);
    //   }, 5000)
    // },
    // (error) => {
    //   this.submitted = true;
    //   this.error = true;
    //   setTimeout(() => {
    //     this._router.navigate(['login']);
    //   }, 5000)
    // });
  }
}
