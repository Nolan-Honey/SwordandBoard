import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { CustomerComponent } from '../customer/customer.component';
import { CustomerService } from 'src/app/Services/customer.service';
import { HttpClient, post } from 'selenium-webdriver/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[CustomerComponent]
})
export class SignupComponent implements OnInit {

  showSuccessMessage:boolean;
  showErrorMessage:string;

  profileForm = new FormGroup({
  first_name: new FormControl('firstName'),
  last_name: new FormControl('lastName'),
  email: new FormControl('email'),
  password: new FormControl('password'),
  confirm_password: new FormControl('')
  });

  title='Sign Up'
  constructor(private customerService:CustomerService) {

   }
  ngOnInit() {
  }
  onSubmit(){
    console.warn(this.profileForm.value);

  }
}
