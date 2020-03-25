import {Component, OnInit} from '@angular/core';
import {Offer, OfferService} from "../../services/offer.service";

@Component({
  selector: 'app-offer-search',
  templateUrl: './offer-search.component.html',
  styleUrls: ['./offer-search.component.css']
})
export class OfferSearchComponent implements OnInit {

  offers: Offer[]

  constructor(private offerService: OfferService) {
  }

  ngOnInit(): void {
    this.offers = this.offerService.searched;
  }

}
