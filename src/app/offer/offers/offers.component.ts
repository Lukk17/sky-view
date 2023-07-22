import {Component, OnInit} from '@angular/core';
import {Offer, OfferService} from '../../services/offer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  offers: Offer[];
  error = null;

  constructor(private offerService: OfferService, private router: Router) {
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

  editOffer(offer: Offer) {
    this.offerService.editedOffer = offer;
    this.router.navigate(['/editOffer']).then();
  }

  goToDetails(offer: Offer) {
    this.offerService.detailedOffer = offer;
    this.router.navigate(['/offerDetails']).then();
  }
}
