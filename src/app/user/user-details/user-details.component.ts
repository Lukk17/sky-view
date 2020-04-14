import {Component, OnInit} from '@angular/core';
import {User, UserService} from "../../services/user.service";
import {OfferService, PersonalBooked} from "../../services/offer.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  error = null;
  bookedOffers: PersonalBooked[] = [];

  constructor(private userService: UserService, private offerService: OfferService) {
  }

  ngOnInit() {
    this.user = new User();
    this.getUserDetails();
    this.getUserBooked();
    console.log("ON INIT")
  }

  private getUserDetails() {
    this.userService.getUserDetails().subscribe(user => {
        this.user.email = user.email;
        this.user.id = user.id;
        this.user.roles = user.roles[0];
      },
      this.handleError
    )
  }

  private getUserBooked() {

    this.offerService.getBookedOffers().subscribe(offers => {
        offers.forEach(offer => {
          offer.booked.forEach(booked => {
            if (booked.userEmail == this.user.email) {
              this.bookedOffers[this.bookedOffers.length] = new PersonalBooked(
                offer.hotelName,
                offer.id.toString(),
                booked.bookedDate
              )
            }
          })
        })
      },
      this.handleError);
    console.log(this.bookedOffers)
  }

  private handleError(error) {
    this.error = error.message;
  }
}
