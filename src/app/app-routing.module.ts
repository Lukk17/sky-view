import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {UserListComponent} from "./user/userList/userList.component";
import {AuthGuard} from "./auth/auth.guard";
import {HelloComponent} from "./hello/hello.component";
import {MyOffersComponent} from "./offer/myOffers/myOffers.component";
import {AddOfferComponent} from "./offer/add-offer/add-offer.component";
import {UserDetailsComponent} from "./user/user-details/user-details.component";

const routes: Routes = [
  {path: '', redirectTo: "/home", pathMatch: "full"},
  {path: 'home', component: HelloComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'myOffers', component: MyOffersComponent},
  {path: 'addOffer', component: AddOfferComponent},
  {path: 'userDetails', component: UserDetailsComponent},
  {
    path: 'userList',
    component: UserListComponent,
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
