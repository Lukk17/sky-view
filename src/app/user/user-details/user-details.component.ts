import {Component, OnInit} from '@angular/core';
import {PersonalBooking} from '../../services/booking.service';
import {SkyAuthService} from '../../services/sky-auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  error = null;
  user = null;
  bookedOffers: PersonalBooking[] = [];

  constructor(private skyAuthService: SkyAuthService) {
  }

  ngOnInit() {
    this.user = this.getUserDetails();
    this.getUserBooked();
  }

  private getUserDetails() {
    return this.skyAuthService.getEmail();
  }

  private getUserBooked() {
  }

  private handleError(error) {
    this.error = error.message;
  }
}
