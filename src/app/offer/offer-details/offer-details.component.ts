import {Component, OnInit} from '@angular/core';
import {Offer, OfferService} from "../../services/offer.service";
import {AuthService} from "../../services/auth.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

  offer: Offer;
  isOwner = false;
  private error: any;

  constructor(private offerService: OfferService, private auth: AuthService, private location: Location) {
  }

  ngOnInit(): void {
    this.offer = this.offerService.detailedOffer;
    this.isOwner = this.offer.ownerEmail == this.auth.loggedEmail.value;
    this.auth.loggedEmail.subscribe(email => {
      this.isOwner = this.offer.ownerEmail == email;
    });
  }

  deleteOffer(id: number) {
    this.offerService.deleteOffer(id).subscribe(() => {
        this.location.back();
      },
      this.handleError
    );
  }

  handleError(error) {
    this.error = error.message;
  }

  bookOffer(id: number) {


  }
}
