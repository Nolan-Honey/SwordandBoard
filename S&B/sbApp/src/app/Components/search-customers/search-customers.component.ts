import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchCustomersComponent implements OnInit {

  public customers = []
  constructor(private customerService:CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers()
    .subscribe(data=>this.customers = data)
  }
  
}
