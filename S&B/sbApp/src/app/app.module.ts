import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { FilterPipe } from './filter/filter.pipe';

import { AppComponent } from './app.component';
import { AdminComponent } from './Components/admin/admin.component';
import { HomeComponent } from './Components/home/home.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { SearchCustomersComponent } from './Components/search-customers/search-customers.component';
import { EditComponent } from './Components/edit/edit.component';

const routes: Routes=[
  {path: '',  component: HomeComponent},
  {path: 'home',  component: HomeComponent},
  {path: 'login',  component: LoginComponent},
  {path: 'customerProfile',  component: CustomerComponent},
  {path: 'admin',  component: AdminComponent},
  {path: 'signup',  component: SignupComponent},
  {path: 'edit/:id', component:  EditComponent},
  
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    CustomerComponent,
    LoginComponent,
    SignupComponent,
    SearchCustomersComponent,
<<<<<<< HEAD
    HeaderComponent,
=======
>>>>>>> parent of 9638468... Merge pull request #2 from nCoder13D/Saif-code
    FilterPipe,
    EditComponent
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
