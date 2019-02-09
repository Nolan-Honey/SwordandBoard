import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./Components/login/login.component";
import {SignupComponent} from "./Components/signup/signup.component"
import { AuthGuard } from "./Shared/auth.guard";
import { HomeComponent } from "./Components/home/home.component";
import { AdminComponent } from "./Components/admin/admin.component";
import { CustomerComponent } from "./Components/customer/customer.component";
import { SearchCustomersComponent } from "./Components/search-customers/search-customers.component"


const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "login", component: LoginComponent},
  { path: "sign-up", component: SignupComponent},
  { path: "admin", component: AdminComponent , canActivate: [AuthGuard]},
  { path: "customer", component: CustomerComponent, canActivate: [AuthGuard]},
  { path: "customer-search", component: SearchCustomersComponent/*, canActivate: [AuthGuard]*/},
  { path: "editCustomer/:customerId", component: CustomerComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
