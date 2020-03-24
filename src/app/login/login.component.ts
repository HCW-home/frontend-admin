
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);
  codeFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();

  subscriptions: Subscription[] = [];
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  email: string;
  password: string;
  samlLoginUrl = `${environment.api}/login-saml`;
  localLoginToken;
  smsLoginToken;
  smsVerificationCode;
  user;

  showPasswordLogin = false;
  showSamlLogin = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    console.log('login component ')

    // If the user is already logged in, redirect him
    if (this.authService.currentUser) {
      this.router.navigateByUrl('/dashboard');
    }

    // If we have a token in the URL, the user has been redirected after the SAML login
    if ('token' in this.route.snapshot.queryParams && this.route.snapshot.queryParams.token) {
      console.log('token ', this.route.snapshot.queryParams.token);

      console.log('return url ', this.route.snapshot.queryParams.returnUrl);
      this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';

      this.subscriptions.push(this.authService.login(this.route.snapshot.queryParams.token)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.error = error;
            this.loading = false;
          }));
    }

    // Load the remote config to select the login methods
    this.authService.getConfig().subscribe(config => {
      console.log(config);
      if (!('method' in config)) {
        this.showPasswordLogin = true;
        this.showSamlLogin = true;
      }

      if (config.method === 'saml') {
        this.showSamlLogin = true;
      } else if (config.method === 'password') {
        this.showPasswordLogin = true;
      } else {
        this.showPasswordLogin = true;
        this.showSamlLogin = true;
      }
    });
  }

  // When the user submits the local form
  loginLocal() {
    console.log('submit', this.email, this.password);
    this.loading = true;
    this.subscriptions.push(this.authService.loginLocal(this.email, this.password).subscribe(res => {
      this.localLoginToken = res.localLoginToken;
      this.user = res.user;
      this.loading = false;

    }, err => {
      this.loading = false;
      this.error = err;
    }));
  }

  loginSms() {
    this.loading = true;
    this.subscriptions.push(this.authService.loginSms(this.smsVerificationCode, this.user).subscribe(res => {
      this.smsLoginToken = res.smsLoginToken;
      this.login2FA();
    }, err => {
      this.loading = false;
      this.error = err;
    }));
  }
  login2FA() {
    this.subscriptions.push(this.authService.login2FA(this.localLoginToken, this.smsLoginToken, this.user).subscribe(res => {
      this.loading = false;
      this.router.navigate(['dashboard']);

    }, err => {
      this.loading = false;
      this.error = err;
    }));
  }
  ngOnDestroy(): void {

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });

  }


}
