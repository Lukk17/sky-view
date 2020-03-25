import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class OfferService implements OnInit {

  urlAllOffers = AuthService.BASIC_ADDRESS + "/getAllOffers";
  urlMyOffers = AuthService.BASIC_ADDRESS + "/getOwnedOffers";
  urlAddOffer = AuthService.BASIC_ADDRESS + "/addOffer";
  urlDeleteOffer = AuthService.BASIC_ADDRESS + "/deleteOffer";

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  ngOnInit(): void {
  }

  public getAllOffers() {
    return this.http
      .get(this.urlAllOffers)
      .pipe(
        catchError(OfferService.handleError),
        tap(OfferService.handleResponse)
      )
  }

  public getMyOffers() {
    const email = this.auth.user.value.email;
    const password = this.auth.user.value.password;
    return this.http
      .get(this.urlMyOffers,
        {
          headers: new HttpHeaders({Authorization: 'Basic ' + btoa(email + ":" + password)})
        })
      .pipe(
        catchError(OfferService.handleError),
        tap(OfferService.handleResponse)
      )
  }


  private static handleError(errorResp: HttpErrorResponse) {
    return throwError(errorResp.error.error.message);
  }

  private static handleResponse(respData: Offer[]) {
    const offers: Offer[] = [];
    for (const key in respData) {
      offers.push(respData[key])
    }
    return offers;
  }


  public addOffer(offerForm: NgForm) {
    const email = this.auth.user.value.email;
    const pass = this.auth.user.value.password;
    const offer = OfferService.buildOffer(offerForm);

    console.log(offer);
    return this.http.post(this.urlAddOffer,
      offer,
      {
        headers: new HttpHeaders({Authorization: 'Basic ' + btoa(email + ":" + pass)})
      });
  }

  public deleteOffer(id: number) {
    const email = this.auth.user.value.email;
    const pass = this.auth.user.value.password;


    return this.http.request('DELETE', this.urlDeleteOffer,
      {
        headers: new HttpHeaders({Authorization: 'Basic ' + btoa(email + ":" + pass)}),
        body: id
      });
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


}

export class Offer {

  constructor(name: string, description: string, price: number, roomCapacity: number, city: string, country: string, photoPath: string) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.roomCapacity = roomCapacity;
    this.city = city;
    this.country = country;
    this.photoPath = photoPath;
  }

  "id": number;
  "name": string;
  "description": string;
  "comment": string;
  "price": number;
  "ownerEmail": string;
  "roomCapacity": number;
  "city": string;
  "country": string;
  "booked": string;
  "photoPath": string;
}
