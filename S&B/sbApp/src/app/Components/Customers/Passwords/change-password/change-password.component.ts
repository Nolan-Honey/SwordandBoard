import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Services/customer.service';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup
  constructor(private customerService: CustomerService, private route: ActivatedRoute,
    private router: Router, private fBuilder: FormBuilder, private authService: AuthService) {
      this.createForm()
    }

  ngOnInit() {
  }

  createForm(){
    this.passwordForm = this.fBuilder.group({
      current_pass: [''],
      new_pass: [''],
      confirm_pass: ['']
    })
  }
}
