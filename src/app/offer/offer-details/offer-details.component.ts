import {Component, OnInit} from '@angular/core';
import {Offer, OfferService} from '../../services/offer.service';
import {AuthService} from '../../services/auth.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css'],

})
export class OfferDetailsComponent implements OnInit {

  offer: Offer;
  isOwner = false;

  constructor(private offerService: OfferService, private auth: AuthService, private location: Location, private router: Router) {
  }

  ngOnInit(): void {
    this.offer = this.offerService.detailedOffer;
    this.isOwner = this.offer.ownerEmail === this.auth.getEmail();
  }

  editOffer(offer: Offer) {
    this.offerService.editedOffer = offer;
    this.router.navigate(['/editOffer']).then();
  }

  deleteOffer(id: number) {
    this.offerService.deleteOffer(id).subscribe(value => {
      console.log(value);
      this.router.navigate(['/myOffers']).then();
      return value;
    });
  }
}



