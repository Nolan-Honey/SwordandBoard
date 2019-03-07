import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptor } from "./Shared/auth-interceptor";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatTableModule,
  MatSelectModule,
} from "@angular/material";
import { AppRoutingModule } from "./app-routing.module";
import { FilterPipe } from './filter/filter.pipe';

import { AppComponent } from './app.component';
import { AdminComponent } from './Components/Administrator/admin/admin.component';
import { HomeComponent } from './Components/home/home.component';
import { CustomerComponent } from './Components/Customers/customer/customer.component';
import { LoginComponent } from './Components/Credentials/login/login.component';
import { SignupComponent } from './Components/Credentials/signup/signup.component';
import { SearchCustomersComponent } from './Components/Administrator/search-customers/search-customers.component';
import { EditComponent } from './Components/Administrator/edit/edit.component';
import { AddCustomerComponent } from './Components/Administrator/add-customer/add-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    CustomerComponent,
    LoginComponent,
    SignupComponent,
    SearchCustomersComponent,
    FilterPipe,
    EditComponent,
    AddCustomerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }