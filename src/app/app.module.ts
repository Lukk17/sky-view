import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {HelloComponent} from './hello/hello.component';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OffersComponent} from './offer/offers/offers.component';
import {AddOfferComponent} from './offer/add-offer/add-offer.component';
import {UserDetailsComponent} from './user/user-details/user-details.component';
import {OfferSearchComponent} from './offer/offer-search/offer-search.component';
import {EditOfferComponent} from './offer/edit-offer/edit-offer.component';
import {OfferDetailsComponent} from './offer/offer-details/offer-details.component';
import {MessageComponent} from './message/message.component';
import {NewMessageComponent} from './message/new-message/new-message.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {NgOptimizedImage} from '@angular/common';
import {AuthModule} from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    HelloComponent,
    OffersComponent,
    AddOfferComponent,
    UserDetailsComponent,
    OfferSearchComponent,
    EditOfferComponent,
    OfferDetailsComponent,
    MessageComponent,
    NewMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    NgOptimizedImage,
    AuthModule.forRoot({
      domain: 'lukk17.eu.auth0.com',
      clientId: '9H4ckShWBYzA5gigTK0VnR1I1Hh7MHz0',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

//  need to install angular material lib to use import:
//  import {MatDialogModule} from '@angular/material/dialog';

//  npm install --save @angular/material @angular/cdk
}
