import { Component } from "@angular/core";
import { FormControl, FormGroup, NgForm } from '@angular/forms';

import { AuthService } from "../../Services/auth.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public authService: AuthService) {}

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }else{
      this.authService.login(this.loginForm.get("email").value, this.loginForm.get("password").value);
    }
  }
}