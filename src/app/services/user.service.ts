import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';

export interface UserResponseData {
  email: string;
  id: string;
  password: string;
  roles: object;
  receivedMessage: object;
  sentMessage: object;
}

export class User {
  email: string;
  id: string;
  password: string;
  roles: {
    id: number;
    name: string;
  };
}

@Injectable({providedIn: 'root'})
export class UserService {
  private userDetailsURL = '/auth/userDetails';

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  private static handleError(errorResp: HttpErrorResponse) {
    return throwError(errorResp.error.error.message);
  }

  public getUserDetails() {

    return this.http
      .get<User>(this.userDetailsURL,
        {
          headers: this.auth.getAuthHeader()
        })
      .pipe(
        catchError(UserService.handleError),
        tap(user => {
          return user;
        })
      );
  }
}
