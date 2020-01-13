import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  private userSub: Subscription;
  isAuth = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.userSub = this.auth.user.subscribe(user => {
      // true if there is user, false if there is not
      this.isAuth = !!user
    });
  }

  routeToHome() {
    //  instead of using routerLink in html file router can be used in method here
    //  if relative path is needed it can be injected to constructor and used in method
    // now it will add this to previous path
    // this.router.navigate(['/'], {relativeTo: this.route}).then(r => this.logger.log("Route to home"))
    this.router.navigate(['/'])
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy(): void {
  }

}
