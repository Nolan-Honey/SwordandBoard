import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Services/customer.service';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup
  customer = []

  constructor( private customerService: CustomerService, private route: ActivatedRoute,
    private router: Router, private fBuilder: FormBuilder, private authService: AuthService) {
      this.createForm()
     }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(data => {
      this.customer = data
    })
  }

  createForm(){
    this.resetForm = this.fBuilder.group({
      email: ['']
    })
  }

  resetPassword(email){
    console.log(email)
    //this.customerService.resetPassword(this.resetForm.value)
  }

}
