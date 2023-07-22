import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {catchError, tap} from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import {environment} from '../../environments/environment';
import {ResponseHandlerService} from './responseHandler.service';


@Injectable({
  providedIn: 'root'
})
export class OfferService implements OnInit {

  searched: Offer[];
  editedOffer: Offer;
  detailedOffer: Offer;
  private BASE_ADDRESS = `${environment.offerBaseAddress}`;
  private ALL_OFFERS_URL = this.BASE_ADDRESS + `${environment.allOfferPath}`;
  private OWNED_OFFERS_URL = this.BASE_ADDRESS + `${environment.ownedOffersPath}`;
  private ADD_OFFER_URL = this.BASE_ADDRESS + `${environment.addOfferPath}`;
  private EDIT_OFFER_URL = this.BASE_ADDRESS + `${environment.editOfferPath}`;
  private DELETE_OFFER_URL = this.BASE_ADDRESS + `${environment.deleteOfferPath}`;
  private SEARCH_OFFER_URL = this.BASE_ADDRESS + `${environment.searchOfferPath}`;

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

  ngOnInit(): void {
  }

  public getAllOffers() {
    return this.http
      .get(this.ALL_OFFERS_URL)
      .pipe(
        catchError((err) => ResponseHandlerService.handleError(err, 'getAllOffers()')),
        tap(ResponseHandlerService.handleGetOffersResponse)
      );
  }

  public getUserOffers() {
    return this.http
      .get(this.OWNED_OFFERS_URL,
        {
          headers: this.auth.getAuthHeader()
        })
      .pipe(
        catchError((err) => ResponseHandlerService.handleError(err, 'getUserOffers()')),
        tap(ResponseHandlerService.handleGetOffersResponse)
      );
  }

  public editOffer(offerForm: NgForm) {
    const offer = OfferService.buildOffer(offerForm);
    offer.id = this.editedOffer.id;

    return this.http.put(this.EDIT_OFFER_URL,
      offer,
      {
        headers: this.auth.getAuthHeader()
      }).pipe(
      catchError((err) => ResponseHandlerService.handleError(err, 'deleteOffer()')),
    );
  }

  public deleteOffer(id: number) {
    return this.http.delete(this.DELETE_OFFER_URL + id,
      {
        headers: this.auth.getAuthHeader(),
      })
      .pipe(
        catchError((err) => ResponseHandlerService.handleError(err, 'deleteOffer()'))
      );
  }

  public searchOffer(searched: string) {
    return this.http
      .post(this.SEARCH_OFFER_URL,
        searched
      )
      .pipe(
        catchError((err) => ResponseHandlerService.handleError(err, 'searchOffer()')),
        tap(ResponseHandlerService.handleGetOffersResponse)
      );
  }

  public addOffer(offerForm: NgForm) {
    const offer = OfferService.buildOffer(offerForm);

    return this.http.post(this.ADD_OFFER_URL,
      offer,
      {
        headers: this.auth.getAuthHeader()
      });
  }
}

export class Offer {

  'id': number;
  'hotelName': string;
  'description': string;
  'comment': string;
  'price': number;
  'ownerEmail': string;
  'roomCapacity': number;
  'city': string;
  'country': string;
  'photoPath': string;

  constructor(hotelName: string, description: string, price: number, roomCapacity: number, city: string,
              country: string, photoPath: string) {
    this.hotelName = hotelName;
    this.description = description;
    this.price = price;
    this.roomCapacity = roomCapacity;
    this.city = city;
    this.country = country;
    this.photoPath = photoPath;
  }
}
