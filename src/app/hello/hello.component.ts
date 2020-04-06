import {Component, OnInit} from '@angular/core';
import {Offer, OfferService} from "../services/offer.service";
import {Router} from "@angular/router";


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
    this.offerService.getAllOffers().subscribe(offers => {
      this.offers = offers;
    }, error => {
      this.error = error.message;
    });
  }

  goToDetails(offer: Offer) {
    this.offerService.detailedOffer = offer;
    this.router.navigate(["/offerDetails"])
  }
}
