import {Component, OnInit} from '@angular/core';
import {Offer, OfferService} from '../services/offer.service';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  offers: Offer[];
  error = null;

  constructor(private offerService: OfferService, private router: Router) {
  }

  ngOnInit() {
    this.getAllOffers();
  }

  getAllOffers() {
    console.log(`Is localDev: ${environment.localDev}`);
    console.log(`Is prod: ${environment.production}`);
    this.offerService.getAllOffers()
      .pipe()
      .subscribe(offers => {
        this.offers = offers;
      });
  }
}
