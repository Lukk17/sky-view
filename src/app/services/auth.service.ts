import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
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
  private LOCAL_STORAGE_USERDATA = 'userData';
  static BASIC_ADDRESS = "http://sky-env.kj3kemztrq.eu-west-2.elasticbeanstalk.com";

  // for local testing
  // static BASIC_ADDRESS = "http://localhost:5555";

  private signUpURL = AuthService.BASIC_ADDRESS + '/registration';
  private logInURL = AuthService.BASIC_ADDRESS + '/login';

  // behavior subject remember last value even before it was created
  user = new BehaviorSubject<User>(null);

  loggedEmail: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  signUp(email: string, password: string) {

    return this.http.post<AuthResponseData>(this.signUpURL,
      {
        "email": email,
        "password": password
      })
  }

  login(email: string, password: string) {
    return this.http.get<AuthResponseData>(this.logInURL,
      {
        headers: new HttpHeaders({Authorization: 'Basic ' + btoa(email + ":" + password)})
      }).pipe(
      catchError(AuthService.handleError),
      tap(respData => {
        this.handleAuth(respData, password);
      })
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem(this.LOCAL_STORAGE_USERDATA);

  }

  private handleAuth(respData: AuthResponseData, password: string) {
    const user = new User(respData.id, respData.email);
    user.password = password;

    // send user from response to any subscriber to 'user' subject
    this.user.next(user);
    // save data to more permanent memory,
    // which can survive site reload and browser restart
    // use JSON lib to convert js object to string
    localStorage.setItem(this.LOCAL_STORAGE_USERDATA, JSON.stringify(user));
  }

  private static handleError(errorResp: HttpErrorResponse) {
    return throwError(errorResp.error.error.message);
  }

  autoLogin() {
    const userData: {
      id: string,
      email: string,
      password: string
    } = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_USERDATA));
    if (userData) {
      const loadedUser = new User(
        userData.id,
        userData.email
      );
      loadedUser.password = userData.password;
      this.user.next(loadedUser);
    }
  }

}
