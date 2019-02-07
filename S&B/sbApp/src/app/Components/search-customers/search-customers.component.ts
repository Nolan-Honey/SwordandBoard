import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Services/customer.service';
import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchCustomersComponent implements OnInit {
  title='Search Customer'
  public customers = []
  constructor(private customerService:CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers()
    .subscribe(data=>this.customers = data)
  }
  
}
