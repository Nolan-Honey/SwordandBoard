import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, EmailValidator } from '@angular/forms';
import { CustomerComponent } from '../../Customers/customer/customer.component';
import { CustomerService } from 'src/app/Services/customer.service';
import { AdminTools } from '../../../Services/adminTools.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [CustomerComponent]
})
export class SignupComponent implements OnInit {

  showSuccessMessage: boolean;
  showErrorMessage: boolean;
  showErrorMessagePassword: boolean;
  showErrorMessageEmail: boolean;
  signupDisabled: boolean;
  settings: any;

  profileForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl('')
  });

  title = 'Sign Up'
  constructor(private customerService: CustomerService, private tools: AdminTools, ) {
  }
  customers = []

  ngOnInit() {
    this.customerService.getCustomers()
      .subscribe(data => this.customers = data);
    this.getSettings();
    setTimeout(() => {
      if(this.settings[0].Login === false){
        this.signupDisabled = true;
      }
    }, 1000);


  }
  onSubmit() {
    var emailExist: Boolean = false;
    this.customers.forEach(element => {
      if (element.email == this.profileForm.get("email").value) {
        emailExist = true;
      }
    });
    if (!emailExist) {
      if (this.profileForm.get("password").value == this.profileForm.get("confirm_password").value) {
        this.customerService.postUser(this.profileForm.value).subscribe(
          res => {
            this.showSuccessMessage = true;
            setTimeout(() => this.showSuccessMessage = false, 4000);
            this.profileForm.reset();
          },
          err => {
            this.showErrorMessage = true;
            setTimeout(() => this.showErrorMessage = false, 4000);
          }
        );
      }
      else {
        this.showErrorMessagePassword = true;
        setTimeout(() => this.showErrorMessagePassword = false, 4000);
      }
    }
    else {
      this.showErrorMessageEmail = true;
      setTimeout(() => this.showErrorMessageEmail = false, 4000);
    }
  }

  getSettings() {
    this.tools.getSettings().subscribe(res => {
      this.settings = res;
      console.log(this.settings[0].Login)
    })
  }
}