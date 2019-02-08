import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Services/customer.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchCustomersComponent implements OnInit {
  title='Search Customer'
  public customers = []
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
    .subscribe(data=>this.customers = data)
  }

  onSubmit(){
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
  
}
