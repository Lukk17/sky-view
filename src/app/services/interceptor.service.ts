import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {tap} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user = this.auth.user;
    let email = user.value.email;
    let password = user.value.password;

    // if no token then do not add anything to as parameter
    if (!email) {
      return next.handle(req);
    }

    // to alter request it needs to be cloned, modified and returned in handle method
    const modifiedReq = req.clone(
      {
        // adds this authentication parameter to every http request
        headers: new HttpHeaders({Authorization: 'Basic ' + btoa(email + ":" + password)})
      });
    return next.handle(modifiedReq)
      // with pipe and tap response can be altered
      .pipe(
        tap(event => {
          console.log("interceptor logging response event type: " + event.type + '    cre: ' + email + password)
        })
      );
  }

}
