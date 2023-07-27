import {Component, Input, OnInit} from '@angular/core';
import {Offer, OfferService} from '../../services/offer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-offers',
  templateUrl: './offers-owned.component.html',
  styleUrls: ['./offers-owned.component.css']
})
export class OffersOwnedComponent implements OnInit {
  offers: Offer[];

  constructor(private offerService: OfferService) {
  }

  ngOnInit(): void {
    this.getUserOffers();
  }

  getUserOffers() {
    this.offerService.getUserOffers().subscribe(offers => {
        this.offers = offers;
      }
    );
  }
}
