import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';



@Injectable({providedIn: 'root'})
export class SkyAuthService {
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

  login() {

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
    const localDev = `${environment.localDev}`;
    if (localDev) {
      return 'offer@owner.com';
    } else {
      return this.userEmail;
    }
  }

}
