import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    if (this.isLoginMode) {
      this.login();
    } else {
      this.signUp(email, password);
    }
  }

  private login() {
    this.authService.loginWithRedirect();
  }

  private signUp(email: string, password: string) {

  }
}
