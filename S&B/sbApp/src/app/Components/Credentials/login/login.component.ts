import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../../../Services/auth.service";
import { AdminTools } from '../../../Services/adminTools.service';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  customers=[]
  adminID=''
  setting = true
  settings: any;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private customerService: CustomerService, public authService: AuthService, private tools: AdminTools, private route: ActivatedRoute, private router: Router) { }
  
  onLogin() {
    if (this.loginForm.invalid) {
      alert('Username/Password Incorrect')
      return;
    } else {
      if(!this.settings[0].Login){
        console.log('admin only')
        if(this.loginForm.get("email").value != 'admin' && this.loginForm.get("password").value != 'password'){
          alert('Username/Password Incorrect')
          return;
        }else{
          this.authService.login(this.loginForm.get("email").value, this.loginForm.get("password").value);
        }
      }else{
        this.authService.login(this.loginForm.get("email").value, this.loginForm.get("password").value);
      }

    }
  }

  getSettings() {
    this.tools.getSettings().subscribe(res => {
      this.settings = res;
      console.log(this.settings[0].Pricing)
    })
  }

  ngOnInit() {
    this.customerService.getCustomers()
    .subscribe(data => this.customers = data);
    this.getSettings();
    // this.route.params.subscribe(params => {
    // this.tools.viewSettings(params['id']).subscribe(res => {
    //     this.settings = res;
    //   })
    // })
  }
}