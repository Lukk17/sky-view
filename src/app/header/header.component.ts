import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService, Role} from "../services/auth.service";
import {NgForm} from "@angular/forms";
import {OfferService} from "../services/offer.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  private userSub: Subscription;
  isAuth = false;
  userEmail: string;
  isAdmin = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private offerService: OfferService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userSub = this.auth.user.subscribe(user => {
      // true if there is user, false if there is not
      this.isAuth = !!user
    });
    // without subscribing after logout and login header mail wasn't update and show previous logged user's email
    this.auth.loggedEmail.subscribe(email => {
      this.userEmail = email;
      this.checkIfAdmin();
    });
    if (this.isAuth) {
      this.userEmail = this.auth.user.value.email;
      this.checkIfAdmin();
      console.log(this.isAdmin)
    }
  }

  checkIfAdmin() {
    this.userService.getUserDetails().subscribe(user => {
        this.isAdmin = false;
        const roles: Role[] = <Role[]><unknown>user.roles;
        roles.forEach(role => {
          if (role.name == "ADMIN") {
            this.isAdmin = true;
          }
        });
      }
    )
  }

  routeToHome() {
    //  instead of using routerLink in html file router can be used in method here
    //  if relative path is needed it can be injected to constructor and used in method
    // now it will add this to previous path
    // this.router.navigate(['/'], {relativeTo: this.route}).then(r => this.logger.log("Route to home"))
    this.router.navigate(['/'])
  }

  logout() {
    this.isAdmin = false;
    this.auth.logout();
  }

  ngOnDestroy(): void {
  }

  search(searchForm: NgForm) {
    this.offerService.searchOffer(searchForm.value.search).subscribe(offers => {
      this.offerService.searched = offers;
      this.router.navigate(['/offerSearch'])
    });
  }
}

