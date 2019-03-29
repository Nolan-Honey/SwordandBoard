import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../../../Services/auth.service";
import { AdminTools } from '../../../Services/adminTools.service';

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit{
  

  setting = true
  settings: any;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public authService: AuthService, private tools:AdminTools, private route: ActivatedRoute,
    private router: Router) {}
  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }else{
      this.authService.login(this.loginForm.get("email").value, this.loginForm.get("password").value);
    }
  }
  getSettings() {
    this.tools.getSettings().subscribe(res => {
      this.settings = res;
      
    })
    
  }
    ngOnInit() {
      this.getSettings();
      this.route.params.subscribe(params => {
        this.settings = this.tools.viewSettings(params['id']).subscribe(res => {
        this.settings = res;
        })
      })
    }
}