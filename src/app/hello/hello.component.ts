import {Component, OnInit} from '@angular/core';
import {Offer, OfferService} from "../services/offer.service";


@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  offers: Offer[];
  error = null;

  constructor(private offerService: OfferService) {
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

}
