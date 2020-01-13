import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {map, take} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.auth.user.pipe(
      take(1),
      map(user => {
        // return true if object is not null
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        // if not logged in redirect to auth page
        return this.router.createUrlTree(['/auth'])
      })
    );
  }

}
