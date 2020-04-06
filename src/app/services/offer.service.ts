import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class OfferService implements OnInit {

  searched: Offer[];
  editedOffer: Offer;
  detailedOffer: Offer;
  private ALL_OFFERS_URL = AuthService.BASIC_ADDRESS + "/offer/getAll";
  private MY_OFFERS_URL = AuthService.BASIC_ADDRESS + "/offer/getOwned";
  private ADD_OFFER_URL = AuthService.BASIC_ADDRESS + "/offer/add";
  private DELETE_OFFER_URL = AuthService.BASIC_ADDRESS + "/offer/delete";
  private SEARCH_OFFER_URL = AuthService.BASIC_ADDRESS + "/offer/search";
  private EDIT_OFFER_URL = AuthService.BASIC_ADDRESS + "/offer/edit";
  private BOOK_OFFER_URL = AuthService.BASIC_ADDRESS + "/offer/book";
  private BOOKED_OFFERS_URL = AuthService.BASIC_ADDRESS + "/offer/getBooked";

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  private static buildOffer(offerForm: NgForm) {
    return new Offer(
      offerForm.value.hotelName,
      offerForm.value.description,
      offerForm.value.price,
      offerForm.value.roomCapacity,
      offerForm.value.city,
      offerForm.value.country,
      offerForm.value.photoPath,
    );
  }

  private static handleError(errorResp: HttpErrorResponse) {
    return throwError(errorResp.error.error.message);
  }

  private static handleResponse(respData: Offer[]) {
    const offers: Offer[] = [];
    for (const key in respData) {
      offers.push(respData[key])
    }
    console.log(offers);
    return offers;
  }

  ngOnInit(): void {
  }

  public getAllOffers() {
    return this.http
      .get(this.ALL_OFFERS_URL)
      .pipe(
        catchError(OfferService.handleError),
        tap(OfferService.handleResponse)
      )
  }

  public getMyOffers() {
    return this.http
      .get(this.MY_OFFERS_URL,
        {
          headers: this.auth.getAuthHeader()
        })
      .pipe(
        catchError(OfferService.handleError),
        tap(OfferService.handleResponse)
      )
  }

  public searchOffer(searched: string) {
    return this.http
      .post(this.SEARCH_OFFER_URL,
        searched
      )
      .pipe(
        catchError(OfferService.handleError),
        tap(OfferService.handleResponse)
      )
  }

  public addOffer(offerForm: NgForm) {
    const offer = OfferService.buildOffer(offerForm);

    return this.http.post(this.ADD_OFFER_URL,
      offer,
      {
        headers: this.auth.getAuthHeader()
      });
  }

  editOffer(offerForm: NgForm) {
    const offer = OfferService.buildOffer(offerForm);
    offer.id = this.editedOffer.id;

    return this.http.put(this.EDIT_OFFER_URL,
      offer,
      {
        headers: this.auth.getAuthHeader()
      });
  }

  public deleteOffer(id: number) {
    return this.http.request('DELETE', this.DELETE_OFFER_URL,
      {
        headers: this.auth.getAuthHeader(),
        body: id
      });
  }
}

export class Offer {

  "id": number;
  "hotelName": string;
  "description": string;
  "comment": string;
  "price": number;
  "ownerEmail": string;
  "roomCapacity": number;
  "city": string;
  "country": string;
  "booked": string;
  "photoPath": string;

  constructor(hotelName: string, description: string, price: number, roomCapacity: number, city: string, country: string, photoPath: string) {
    this.hotelName = hotelName;
    this.description = description;
    this.price = price;
    this.roomCapacity = roomCapacity;
    this.city = city;
    this.country = country;
    this.photoPath = photoPath;
  }
}
