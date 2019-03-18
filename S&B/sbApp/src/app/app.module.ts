import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptor } from "./Shared/auth-interceptor";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatTableModule,
  MatSelectModule, MatSidenavModule, MatIconModule, MatListModule,
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
import { LayoutModule } from '@angular/cdk/layout';

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
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }