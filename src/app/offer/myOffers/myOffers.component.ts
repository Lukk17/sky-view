import {Component, OnInit} from '@angular/core';
import {Offer, OfferService} from "../../services/offer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-offers',
  templateUrl: './myOffers.component.html',
  styleUrls: ['./myOffers.component.css']
})
export class MyOffersComponent implements OnInit {
  offers: Offer[];
  error = null;

  constructor(private offerService: OfferService, private router: Router) {
  }

  ngOnInit(): void {
    this.getMyOffers();
  }

  getMyOffers() {
    this.offerService.getMyOffers().subscribe(offers => {
        this.offers = offers;
      },
      this.handleError
    );
  }

  handleError(error) {
    this.error = error.message;
  }

  editOffer(offer: Offer) {
    this.offerService.editedOffer = offer;
    this.router.navigate(['/editOffer'])
  }

  goToDetails(offer: Offer) {
    this.offerService.detailedOffer = offer;
    this.router.navigate(["/offerDetails"])
  }
}
