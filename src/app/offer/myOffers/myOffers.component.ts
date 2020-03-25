import {Component, OnInit} from '@angular/core';
import {Offer, OfferService} from "../../services/offer.service";

@Component({
  selector: 'app-my-offers',
  templateUrl: './myOffers.component.html',
  styleUrls: ['./myOffers.component.css']
})
export class MyOffersComponent implements OnInit {
  offers: Offer[];
  error = null;

  constructor(private offerService: OfferService) {
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

  deleteOffer(id: number) {
    this.offerService.deleteOffer(id).subscribe(() => {
        this.getMyOffers();
      },
      this.handleError
    );
  }

  handleError(error) {
    this.error = error.message;
  }
}
