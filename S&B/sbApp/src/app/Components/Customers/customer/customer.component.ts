import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { CustomerService } from '../../../Services/customer.service';
import { AdminTools } from '../../../Services/adminTools.service'
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  title = 'My Profile';
  userIsAuthenticated = false;
  customerLoaded = false;
  now = formatDate(new Date(), 'yyyy/MM/dd', 'en');;
  private customer: any;
  private history: any;
  private authListenerSubs: Subscription;
  isAdmin = false;
  private adminListenerSubs: Subscription;
  setting = true
  settings: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private customerService: CustomerService, 
    private tools:AdminTools
  ) { }
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
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

      this.isAdmin = this.authService.getIsAdmin();
      this.adminListenerSubs = this.authService
        .getIsAdminStatusListener()
        .subscribe(admin => {
          this.isAdmin = admin;
        });
    
    this.customerService.viewCustomer(localStorage.getItem("currentUserId")).subscribe(res => {
      this.customer = res
      this.customerLoaded = true
    })
    this.getUserHistory()
    
  }

  getUserHistory(){
    this.customerService.getHistory(localStorage.getItem("currentUserId")).subscribe(res=>{
      this.history = res
      console.log(this.history)
    })
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.adminListenerSubs.unsubscribe();

  }

}
