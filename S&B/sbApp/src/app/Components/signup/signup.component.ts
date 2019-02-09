import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { CustomerComponent } from '../customer/customer.component';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [CustomerComponent]
})
export class SignupComponent implements OnInit {

  showSuccessMessage: boolean;
  showErrorMessage: string;

  profileForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl('')
  });
  title = 'Sign Up'
  constructor(private customerService: CustomerService) {
  }
  ngOnInit() {
  }
  onSubmit() {
    if (this.profileForm.get("password").value == this.profileForm.get("confirm_password").value) {
      this.customerService.postUser(this.profileForm.value).subscribe(
        res => {
          this.showSuccessMessage = true;
          setTimeout(() => this.showSuccessMessage = false, 4000);
        },
        err => {
          this.showErrorMessage = "Error, try again or contact customer service!";
        }
      );
    }
    else {
      this.showErrorMessage = "Password doesn't match!"
    }
  }
}
