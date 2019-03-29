import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { AdminTools } from '../../../Services/adminTools.service';
import { CustomerService } from 'src/app/Services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title='System Tools';
  showAdd=false;
  showCustomer=false;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  settingId='5c9e884e1c9d44000084a503'
  isAdmin = false;
  cardPricing = true;
  cardStock = true;
  storeCredit = true;
  customerLogin = true;
  setting = true
  settings: any;
  private adminListenerSubs: Subscription;
  constructor(private authService: AuthService, private tools: AdminTools, private route: ActivatedRoute,
    private router: Router) {}


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
  }
  showAddCustomer(b){
  return this.showAdd=b
  }
  showSearchCustomer(b){
    return this.showCustomer=b
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.adminListenerSubs.unsubscribe();

  }
  stockClicked(event) {
    if ( event.target.checked ) {
      this.cardStock = true;
      console.log("Card Stock Enabled: " + this.cardStock)
    }else{
      this.cardStock = false;
      console.log("Card Stock Enabled: " + this.cardStock)
    }
  }
  pricingClicked(event) {
    if ( event.target.checked ) {
      this.cardPricing = true;
      console.log("Card Pricing Enabled: " + this.cardPricing)
    }else{
      this.cardPricing = false;
      console.log("Card Pricing Enabled: " + this.cardPricing)
    }
  }
  creditClicked(event) {
    if ( event.target.checked ) {
      this.storeCredit = true;
      console.log("Store Credit Enabled: " + this.storeCredit)
    }else{
      this.storeCredit = false;
      console.log("Store Credit Enabled: " + this.storeCredit)
    }
  }
  loginClicked(event) {
    if ( event.target.checked ) {
      this.customerLogin = true;
      console.log("Customer Login Enabled: " + this.customerLogin)
    }else{
      this.customerLogin = false;
      console.log("Customer Login Enabled: " + this.customerLogin)
    }
  }
  confirmChanges(){
    console.log('this.settings._id is ' + this.settingId.replace("'","")+"\nCustomer Login Enabled: " + this.customerLogin +"\nStore Credit Enabled: " + this.storeCredit+"\nCard Pricing Enabled: " + this.cardPricing+"\nCard Stock Enabled: " + this.cardStock)
    this.route.params.subscribe(params => {
      this.tools.updateSettings(this.settingId.replace("'",""),this.customerLogin,this.cardPricing,this.cardStock,this.storeCredit);
      this.router.navigate(['admin'])
      alert('Settings Updated!')
    });
    
  }


}
