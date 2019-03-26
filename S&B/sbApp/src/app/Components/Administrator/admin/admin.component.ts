import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

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
  isAdmin = false;
  private adminListenerSubs: Subscription;
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
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
}
