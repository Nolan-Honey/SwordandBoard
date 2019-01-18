import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AdminComponent } from './Components/admin/admin.component';
import { HomeComponent } from './Components/home/home.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes=[
  {path: '',  component: HomeComponent},
  {path: 'home',  component: HomeComponent},
  {path: 'login',  component: LoginComponent},
  {path: 'customerProfile',  component: CustomerComponent},
  {path: 'admin',  component: AdminComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    CustomerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
