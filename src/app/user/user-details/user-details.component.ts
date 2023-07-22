import {Component, OnInit} from '@angular/core';
import {User, UserService} from '../../services/user.service';
import {PersonalBooking} from '../../services/booking.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  error = null;
  bookedOffers: PersonalBooking[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.user = new User();
    this.getUserDetails();
    this.getUserBooked();
  }

  private getUserDetails() {
    this.userService.getUserDetails().subscribe(user => {
        this.user.email = user.email;
        this.user.id = user.id;
        this.user.roles = user.roles[0];
      },
      this.handleError
    );
  }

  private getUserBooked() {
  }

  private handleError(error) {
    this.error = error.message;
  }
}
