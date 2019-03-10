import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  customer: any
  showSuccessMessage: boolean;
  showErrorMessage: boolean;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private fBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.createForm()
  }

  createForm() {
    this.editForm = this.fBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      password: [''],
      store_credit: [''],
    });
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe(res => {
      this.customer = res;
    })
  }
  updateCustomer(first_name, last_name, email, password, credit) {
    this.route.params.subscribe(params => {
      this.customerService.updateCustomer(params['id'], first_name, last_name, email, credit);
      this.router.navigate(['admin'])
    });
  }

  ngOnInit() {
    this.getCustomers();
    this.route.params.subscribe(params => {
      this.customer = this.customerService.viewCustomer(params['id']).subscribe(res => {
        this.customer = res;
      })
    })

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
