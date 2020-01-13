import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
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

class User {
  email: string;
  id: string;
  password: string;
  roles: object;
  receivedMessage: object;
  sentMessage: object;
}

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getAllUsers() {
    const userListURL = 'http://sky-env.kj3kemztrq.eu-west-2.elasticbeanstalk.com/userList';
    return this.http.get<User[]>(userListURL).pipe(
      catchError(this.handleError),
      tap(respData => {
        this.handleResponse(respData);
      })
    );
  }

  private handleError(errorResp: HttpErrorResponse) {
    return throwError(errorResp.error.error.message);
  }

  private handleResponse(respData: User[]) {
    const postsArray: User[] = [];
    for (const key in respData) {
      postsArray.push(respData[key])
    }
  }
}
