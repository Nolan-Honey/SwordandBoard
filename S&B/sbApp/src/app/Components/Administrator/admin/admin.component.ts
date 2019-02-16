import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title='Admin Tools';
  showAdd=false;
  showCustomer=false;
  constructor() {}

  ngOnInit() {
  }
  showAddCustomer(b){
  return this.showAdd=b
  }
  showSearchCustomer(b){
    return this.showCustomer=b
  }
}
