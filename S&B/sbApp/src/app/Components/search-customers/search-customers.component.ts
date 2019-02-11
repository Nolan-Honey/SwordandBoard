import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { CustomerService } from 'src/app/Services/customer.service';
import { Customer } from '../../Shared/customer.model';


import { FormControl, FormGroup, NgForm } from '@angular/forms';
@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchCustomersComponent implements OnInit {

  showErrorMessageEmail:Boolean = false;
  customers = []
  constructor(private customerService:CustomerService) { }
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
    .subscribe(data => this.customers = data)
  }
  onClickDelete(id){
    if(confirm("Are you sure you want to delete this customer?")){
    this.customerService.deleteCustomer(id).subscribe(res =>{
      console.log("customer deleted")
      this.ngOnInit()
    })
  }
  }
  onSubmit(){
    var emailExist:Boolean = false;
    this.customers.forEach(element => {
    if(element.email == this.newCustomer.get("email").value){
      emailExist = true;
    }
  });
  if(!emailExist){
    this.customerService.postUser(this.newCustomer.value).subscribe(
      res => {
        this.successMessage = true;
        this.newCustomer.reset();
        location.reload();
      },
      err => {
        console.log(err)
        }
  );
  }
  else{
    this.showErrorMessageEmail = true;
    setTimeout(()=> this.showErrorMessageEmail = false,4000);
}
}
}
