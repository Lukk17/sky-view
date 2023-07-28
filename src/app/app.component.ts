import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // constructor(private auth: AuthService) {
  // }

  ngOnInit(): void {

    if (`${environment.localDev}` === 'true') {
      console.log('Local Dev');
      console.log(`Is localDev: ${environment.localDev}`);
      console.log(`Offer base url: ${environment.offerBaseAddress}`);
      console.log(`Booking base url: ${environment.bookingBaseAddress}`);
      console.log(`Message base url: ${environment.messageBaseAddress}`);
    } else {
      console.log(`Base url: ${environment.offerBaseAddress}`);
    }

    if (`${environment.production}` === 'true') {
      console.log('Production build');
      console.log(`Is prod: ${environment.production}`);
    }

    // this.auth.autoLogin();
  }
}
