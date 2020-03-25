import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {OfferService} from "../../services/offer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  error: string = null;

  constructor(private offerService: OfferService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(offerForm: NgForm) {

    this.offerService.addOffer(offerForm).subscribe(offer => {
      this.router.navigate(['/myOffers']);
    })

  }
}
