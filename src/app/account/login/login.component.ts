import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../_services';
import { ActivatedRoute, Router } from '@angular/router';

import * as hmacSHA512 from 'crypto-js/hmac-sha512';
import * as Base64 from 'crypto-js/enc-base64';
import * as uuid from 'uuid';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSubmitting = false;
  isSubmitted = false;


  errorInLogin: boolean = false;
  errorMessage: string = '';
  disableSignIn: boolean = false;
  signInStyle: object = {};

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  loginForm: FormGroup = this.formBuilder.group({
    email: ['m.jarange@gmail.com', [Validators.required, Validators.email]],
    password: ['BMJ@0805', [Validators.required]],
  });

  ngOnInit(): void {
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.isSubmitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    this.authenticationService.login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          if (res.successFlag && !res.returnValue.activatePendingFlag) {
            // get return url from route parameters or default to '/'
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
          } else if (res.successFlag && res.returnValue.activatePendingFlag!) {
            // redirect to confirm account if account not activated
            this.router.navigate(['confirmAccount', res.email]);
          } else {
            this.errorMessage = res.message;
          }

          this.isSubmitting = false;
        },
        error: error => {
          this.errorMessage = error;
          this.isSubmitting = false;
        }
      })
  }
}
