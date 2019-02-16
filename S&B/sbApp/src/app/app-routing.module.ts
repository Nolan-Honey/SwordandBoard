import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./Components/Credentials/login/login.component";
import {SignupComponent} from "./Components/Credentials/signup/signup.component"
import { AuthGuard } from "./Shared/auth.guard";
import { HomeComponent } from "./Components/home/home.component";
import { AdminComponent } from "./Components/Administrator/admin/admin.component";
import { CustomerComponent } from "./Components/Customers/customer/customer.component";
import { SearchCustomersComponent } from "./Components/Administrator/search-customers/search-customers.component"


const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "login", component: LoginComponent},
  { path: "sign-up", component: SignupComponent},
  { path: "admin", component: AdminComponent , canActivate: [AuthGuard]},
  { path: "customer", component: CustomerComponent, canActivate: [AuthGuard]},
  { path: "customer-search", component: SearchCustomersComponent/*, canActivate: [AuthGuard]*/},
  { path: 'edit/:id', component:  AdminComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
