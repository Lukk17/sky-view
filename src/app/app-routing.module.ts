import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {UserListComponent} from "./user-list/user-list.component";
import {AuthGuard} from "./auth/auth.guard";
import {HelloComponent} from "./hello/hello.component";

const routes: Routes = [
  {path: '', redirectTo: "/home", pathMatch: "full"},
  {path: 'home', component: HelloComponent},
  {path: 'auth', component: AuthComponent},
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
