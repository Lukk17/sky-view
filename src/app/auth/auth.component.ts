import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

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
      this.login(email, password);
    } else {
      this.signUp(email, password);
    }
  }

  private login(email: string, password: string) {
    let authObs = this.authService.login(email, password);

    authObs.subscribe(response => {
        this.authService.loggedEmail.next(email);
        this.router.navigate(['/']);
      }
    );
  }

  private signUp(email: string, password: string) {
    let authObs = this.authService.signUp(email, password);

    authObs.subscribe(response => {
        this.login(email, password);
      },
      errorMessage => {
        console.error(errorMessage);
        this.error = errorMessage;
      }
    );
  }
}
