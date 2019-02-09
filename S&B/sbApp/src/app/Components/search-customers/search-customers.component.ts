import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { CustomerService } from 'src/app/Services/customer.service';
import { Customer } from '../../Shared/customer.model';


@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchCustomersComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'first_name', 'last_name', 'email', 'credit'];
  customers: Customer[] = []
  dataSource: any;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers()
      .subscribe(data => {
        console.log(data);
        this.customers = data;
        this.dataSource = new MatTableDataSource(this.customers)
      })
  }
}