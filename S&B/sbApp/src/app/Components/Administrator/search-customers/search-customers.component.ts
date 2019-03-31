import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Services/customer.service';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Subscription } from 'rxjs';
import { store } from '@angular/core/src/render3';

@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchCustomersComponent implements OnInit {
  title = 'Search Customer'
  editCustomer = false;
  showErrorMessageEmail: Boolean = false;
  customers = []
  customer_id: String
  successMessage = false;
  pass = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  editForm: FormGroup;
  customer: any
  showSuccessMessage: boolean;
  showErrorMessage: boolean;
  message: String;
  load = false;
  userIsAuthenticated = false;
  isAdmin: boolean;
  private authListenerSubs: Subscription;
  private adminListenerSubs: Subscription;

  newCustomer = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(this.pass),
  });

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private fBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.createForm()
  }

  ngOnInit() {
    this.customerService.getCustomers()
      .subscribe(data => 
        this.customers = this.filterCustomers(data)
        )
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.adminListenerSubs = this.authService
      .getIsAdminStatusListener()
      .subscribe(isAdmin => {
        this.isAdmin = isAdmin;
      });
    this.isAdmin = this.authService.getIsAdmin();
  }

  filterCustomers(customers){
    let index = customers.findIndex(i => i.email === 'admin')
    customers.splice(index, 1)
    return customers
  }

  onClickDelete(id) {
    if (confirm("Are you sure you want to delete this customer?")) {
      this.customerService.deleteCustomer(id).subscribe(res => {
        console.log("customer deleted")
        this.ngOnInit()
      })
    }
  }
  onSubmit() {
    var emailExist: Boolean = false;
    this.customers.forEach(element => {
      if (element.email == this.newCustomer.get("email").value) {
        emailExist = true;
      }
    });
    if (!emailExist) {
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
    else {
      this.showErrorMessageEmail = true;
      setTimeout(() => this.showErrorMessageEmail = false, 4000);
    }
  }

  /****************************************************************/
  //update form methods
  createForm() {
    this.editForm = this.fBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      store_credit: [''],
      notes: [''],
    });

  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(res => {
      this.customer = res;
    })
  }

  getID(id) {
    this.customer_id = id
    this.customer = this.customerService.viewCustomer(this.customer_id).subscribe(res => {
      this.customer = res;
    })
  }

  addCredit(amount) {
    if (!isNaN(Number(amount))){
    //store current credit
    var current_credit = Number(this.customer.credit)
    //create new credit
    var new_credit = current_credit + Number(amount)
    //store new credit to customer object
    this.customer.credit = new_credit
    this.showSuccessMessage = true
    this.message = "Credit Added"
    setTimeout(() => {this.showSuccessMessage = false}, 4000)
    }
    else {
      this.showErrorMessage = true
      this.message = "Amount entered is not a number"
      setTimeout(()=> {this.showErrorMessage = false}, 4000)
      console.log(this.message)
    }
  }

  subtractCredit(amount) {
    if (!isNaN(Number(amount)) && Number(amount) <= this.customer.credit){
      //store current credit
      var current_credit = Number(this.customer.credit)
      //create new credit
      var new_credit = current_credit - Number(amount)
      //store new credit to customer object
      this.customer.credit = new_credit
      this.showSuccessMessage = true
      this.message = "Credit subtracted"
      setTimeout(() => {this.showSuccessMessage = false}, 4000)
      }
      else if(isNaN(Number(amount))) {
        this.showErrorMessage = true
        this.message = "Amount entered is not a number"
        setTimeout(()=> {this.showErrorMessage = false}, 4000)
        console.log(this.message)
      }
      else{
        this.showErrorMessage = true
        this.message = "Amount entered is higher than the available credit. Credit not subtracted"
        setTimeout(()=> {this.showErrorMessage = false}, 4000)
        console.log(this.message)
      }
      // setTimeout(() => this.successMessage = false, 4000)
  }

  updateCustomer(first_name, last_name, notes) {
    this.customerService.updateCustomer(this.customer_id, first_name, last_name, this.customer.credit, notes);
    this.showSuccessMessage = true
    this.message = "Update successful"
    setTimeout(() => {location.reload(), this.load = false, this.showSuccessMessage = false}, 3000)
  }


  onLoad(b) {
    this.load = b
    this.route.params.subscribe(params => {
      this.customer = this.customerService.viewCustomer(params['id']).subscribe(res => {
        this.customer = res;
      })
    })
  }
  enableEditCustomer(b) {
    this.editCustomer = b
    this.router.navigate(['/edit', '5c618f5afff4e72cd42580fc'])
  }
  disableEditCustomer(b) {
    this.editCustomer = b
    this.router.navigate(['admin'])
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.adminListenerSubs.unsubscribe();

  }
}
