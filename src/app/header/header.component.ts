import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SkyAuthService } from '../services/sky-auth.service';

import {NgForm} from '@angular/forms';
import {OfferService} from '../services/offer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  userEmail: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private offerService: OfferService,
    private skyAuth: SkyAuthService,
  ) {
  }

  ngOnInit() {
    this.userEmail = this.skyAuth.getEmail();
    console.log(`auth email ${this.userEmail}`);

    if (this.userEmail != null) {
      this.isAuth = true;
    }
  }

  routeToHome() {
    //  instead of using routerLink in html file router can be used in method here
    //  if relative path is needed it can be injected to constructor and used in method
    // now it will add this to previous path
    // this.router.navigate(['/'], {relativeTo: this.route}).then(r => this.logger.log("Route to home"))
    this.router.navigate(['/']).then();
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.isAuth = false;
    // this.auth.logout();
  }

  ngOnDestroy(): void {
  }

  search(searchForm: NgForm) {
    this.offerService.searchOffer(searchForm.value.search).subscribe(offers => {
      this.offerService.searched = offers;
      // mid navigating to "/home" required to reload "/offerSearch" items [workaround]
      this.router.navigate(['/home']).then(value => {
        this.router.navigate(['/offerSearch']).then();
      });
    });
  }
}

