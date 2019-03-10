import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Services/customer.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  showErrorMessageEmail: Boolean = false;
  customers = []
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(
    private customerService: CustomerService,
    private authService: AuthService
  ) { }
  successMessage = false;
  pass = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  newCustomer = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(this.pass),
  });



  ngOnInit() {
    this.customerService.getCustomers()
      .subscribe(data => this.customers = data);

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  onSubmit() {
    var emailExist: Boolean = false;
    this.customers.forEach(element => {
      if (element.email == this.newCustomer.get("email").value) {
        emailExist = true;
      }
    });
    if (!emailExist) {
      this.customerService.postUser(this.newCustomer.value).subscribe(
        res => {
          this.successMessage = true;
          this.newCustomer.reset();
        },
        err => {
          console.log(err)
        }
      );
    }
    else {
      this.showErrorMessageEmail = true;
      setTimeout(() => this.showErrorMessageEmail = false, 4000);
    }
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
