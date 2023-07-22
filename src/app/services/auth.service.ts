import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  private LOCAL_STORAGE_TOKEN = 'token';
  private LOCAL_STORAGE_USER_EMAIL = 'userEmail';

  private userToken;
  private userEmail;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.autoLogin();
  }

  signUp(email: string, password: string) {
  }

  login(email: string, password: string) {
  }

  logout() {
    this.router.navigate(['/home']).then();
    localStorage.removeItem(this.LOCAL_STORAGE_TOKEN);
    localStorage.removeItem(this.LOCAL_STORAGE_USER_EMAIL);
  }

  autoLogin() {
    const token = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_TOKEN));
    const email = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_USER_EMAIL));
    if (email && token) {
      this.userToken.next(token);
      this.userEmail.next(email);
    }
  }

  public getAuthHeader() {
    // return new HttpHeaders({Authorization: this.authType.value + ' ' + this.userToken.value});
    return new HttpHeaders({'X-Forwarded-User': 'offer@owner.com'});
  }

  public getEmail() {
    return 'offer@owner.com';
  }

}
