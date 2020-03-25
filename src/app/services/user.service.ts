import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";

export interface UserResponseData {
  email: string,
  id: string,
  password: string,
  roles: object,
  receivedMessage: object,
  sentMessage: object
}

export class User {
  email: string;
  id: string;
  password: string;
  roles: {
    id: number;
    name: string;
  };
  receivedMessage: object;
  sentMessage: object;
}

@Injectable({providedIn: 'root'})
export class UserService {
  private userListURL = AuthService.BASIC_ADDRESS + '/userList';
  private userDetailsURL = AuthService.BASIC_ADDRESS + '/userDetails';

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  public getAllUsers() {

    return this.http
      .get<User[]>(this.userListURL,
        {
          headers: this.getAuthHeader()
        })
      .pipe(
        catchError(UserService.handleError),
        tap(UserService.handleResponse)
      );
  }

  public getUserDetails() {

    return this.http
      .get<User>(this.userDetailsURL,
        {
          headers: this.getAuthHeader()
        })
      .pipe(
        catchError(UserService.handleError),
        tap(user => {
          return user;
        })
      );

  }

  private getAuthHeader() {
    const email = this.auth.user.value.email;
    const password = this.auth.user.value.password;
    return new HttpHeaders({Authorization: 'Basic ' + btoa(email + ":" + password)})
  }

  private static handleError(errorResp: HttpErrorResponse) {
    return throwError(errorResp.error.error.message);
  }

  private static handleResponse(respData: User[]) {
    const users: User[] = [];
    for (const key in respData) {
      users.push(respData[key])
    }
    return users;
  }

}
