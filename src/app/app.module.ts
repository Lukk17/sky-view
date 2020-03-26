import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {HeaderComponent} from './header/header.component';
import {AuthGuard} from "./auth/auth.guard";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {UserListComponent} from './user/userList/userList.component';
import {HelloComponent} from './hello/hello.component';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MyOffersComponent} from './offer/myOffers/myOffers.component';
import {AddOfferComponent} from './offer/add-offer/add-offer.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { OfferSearchComponent } from './offer/offer-search/offer-search.component';
import { EditOfferComponent } from './offer/edit-offer/edit-offer.component';
import { OfferDetailsComponent } from './offer/offer-details/offer-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    UserListComponent,
    HelloComponent,
    MyOffersComponent,
    AddOfferComponent,
    UserDetailsComponent,
    OfferSearchComponent,
    EditOfferComponent,
    OfferDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

//  need to install angular material lib to use import:
//  import {MatDialogModule} from '@angular/material/dialog';

//  npm install --save @angular/material @angular/cdk
}
