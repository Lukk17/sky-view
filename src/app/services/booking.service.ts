import {Injectable, OnInit} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {ResponseHandlerService} from './responseHandler.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {Offer} from './offer.service';
import {NgForm} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BookingService implements OnInit {

  private BASE_ADDRESS = `${environment.bookingBaseAddress}`;
  private BOOKINGS = this.BASE_ADDRESS + `${environment.bookings}`;
  private ADD_BOOKING = this.BASE_ADDRESS + `${environment.addBooking}`;
  private DELETE_BOOKING = this.BASE_ADDRESS + `${environment.deleteBooking}`;

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  private static buildBookingPayload(bookingForm: NgForm, offer: Offer) {
    return new BookingPayload(String(offer.id), bookingForm.value.dateToBook);
  }

  ngOnInit(): void {
  }

  public getBookedOffers() {
    return this.http
      .get(this.BOOKINGS,
        {
          headers: this.auth.getAuthHeader()
        })
      .pipe(
        catchError((err) => ResponseHandlerService.handleError(err, 'getBookedOffers()')),
        tap(ResponseHandlerService.handleGetBookingsResponse)
      );
  }

  deleteBooking(id: number) {
    return this.http.delete(this.DELETE_BOOKING + id,
      {
        headers: this.auth.getAuthHeader(),
      })
      .pipe(
        catchError((err) => ResponseHandlerService.handleError(err, 'deleteOffer()'))
      );
  }

  addBooking(bookingForm: NgForm, offer: Offer) {
    const bookingPayload = BookingService.buildBookingPayload(bookingForm, offer);
    console.log(bookingPayload);
    return this.http.post(this.ADD_BOOKING,
      bookingPayload,
      {
        headers: this.auth.getAuthHeader()
      });
  }
}

export class BookingPayload {
  'offerId': string;
  'dateToBook': string;

  constructor(offerId: string, dateToBook: string) {
    this.offerId = offerId;
    this.dateToBook = dateToBook;
  }
}

export class Booking {
  'id': number;
  'offerId': number;
  'bookedDate': string;
  'bookingUser': string;
  'ownerEmail': string;

  constructor(id: number, offerId: number, bookedDate: string, bookingUser: string, ownerEmail: string) {
    this.id = id;
    this.offerId = offerId;
    this.bookedDate = bookedDate;
    this.bookingUser = bookingUser;
    this.ownerEmail = ownerEmail;
  }
}

export class PersonalBooking {
  'hotelName': string;
  'id': string;
  'offerId': string;
  'date': string;

  constructor(hotelName: string, id: string, offerId: string, date: string) {
    this.hotelName = hotelName;
    this.id = id;
    this.date = date;
    this.offerId = offerId;
  }
}
