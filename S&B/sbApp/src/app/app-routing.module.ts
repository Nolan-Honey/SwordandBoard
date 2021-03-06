import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./Components/Credentials/login/login.component";
import {SignupComponent} from "./Components/Credentials/signup/signup.component"
import { AuthGuard, AdminAuthGuard } from "./Shared/auth.guard";
import { HomeComponent } from "./Components/home/home.component";
import { AdminComponent } from "./Components/Administrator/admin/admin.component";
import { CustomerComponent } from "./Components/Customers/customer/customer.component";
import { SearchCustomersComponent } from "./Components/Administrator/search-customers/search-customers.component";
import { CartComponent } from "./Components/Customers/cart/cart.component";
import { ChangePasswordComponent } from './Components/Customers/Passwords/change-password/change-password.component';
import { ResetPasswordComponent } from './Components/Customers/Passwords/reset-password/reset-password.component';



const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "login", component: LoginComponent},
  { path: "sign-up", component: SignupComponent},
  { path: "change-pass", component:ChangePasswordComponent},
  { path: "reset-pass", component: ResetPasswordComponent},
  { path: "admin", component: AdminComponent , canActivate: [AdminAuthGuard]},
  { path: "customer", component: CustomerComponent, canActivate: [AuthGuard]},
  { path: "customer-search", component: SearchCustomersComponent, canActivate: [AdminAuthGuard]},
  { path: 'edit/:id', component:  AdminComponent, canActivate: [AdminAuthGuard]},
  { path: 'cart', component:  CartComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminAuthGuard]
})
export class AppRoutingModule {}
