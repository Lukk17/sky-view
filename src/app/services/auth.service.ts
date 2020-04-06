import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "../auth/user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  email: string,
  id: string,
}

export class Role {
  id: number;
  name: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  // for local testing
  static BASIC_ADDRESS = "http://localhost:8762";
  // behavior subject remember last value even before it was created
  userToken = new BehaviorSubject<string>(null);
  authType = new BehaviorSubject<User>(null);
  // static BASIC_ADDRESS = "http://sky-env.kj3kemztrq.eu-west-2.elasticbeanstalk.com";
  loggedEmail = new BehaviorSubject<string>(null);
  private LOCAL_STORAGE_TOKEN = 'token';
  private LOCAL_STORAGE_USER_EMAIL = 'userEmail';
  private LOCAL_STORAGE_AUTH_TYPE = 'tokenType';
  private signUpURL = AuthService.BASIC_ADDRESS + '/user/register';
  private logInURL = AuthService.BASIC_ADDRESS + '/auth/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  private static handleError(errorResp: HttpErrorResponse) {
    return throwError(errorResp.message);

  }

  signUp(email: string, password: string) {

    return this.http.post<AuthResponseData>(this.signUpURL,
      {
        "email": email,
        "password": password
      })
  }

  login(email: string, password: string) {
    return this.http.post(this.logInURL,
      {
        "username": email,
        "password": password
      },
      {responseType: 'text'}).pipe(
      catchError(AuthService.handleError),
      tap(respData => {
        localStorage.setItem(this.LOCAL_STORAGE_USER_EMAIL, JSON.stringify(email))
        this.handleAuth(respData);
      })
    );
  }

  logout() {
    this.userToken.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem(this.LOCAL_STORAGE_TOKEN);
    localStorage.removeItem(this.LOCAL_STORAGE_USER_EMAIL);

  }

  autoLogin() {
    const token = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_TOKEN));
    const email = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_USER_EMAIL));
    const authType = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_AUTH_TYPE));
    if (email && token && authType) {
      this.userToken.next(token);
      this.loggedEmail.next(email);
      this.authType.next(authType);
    }
  }

  public getAuthHeader() {
    return new HttpHeaders({Authorization: this.authType.value + ' ' + this.userToken.value})
  }

  private handleAuth(respData) {

    let response = respData.toString();
    let split = response.split(" ");
    let type = split[0];
    let token = split[1].trim();

    this.authType.next(type);

    // send user from response to any subscriber to 'user' subject
    this.userToken.next(token);
    // save data to more permanent memory,
    // which can survive site reload and browser restart
    // use JSON lib to convert js object to string
    localStorage.setItem(this.LOCAL_STORAGE_TOKEN, JSON.stringify(token));
    localStorage.setItem(this.LOCAL_STORAGE_AUTH_TYPE, JSON.stringify(type));
  }

}
