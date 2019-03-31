import { Component, OnInit } from '@angular/core';
import { cardService } from '../../Services/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/Services/auth.service';
import { Subscription } from 'rxjs';
import { AdminTools } from '../../Services/adminTools.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Home Component';
  cardName: string = ""
  cards: any = []
  setData: any = []
  setName = []
  private cart: any;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  isAdmin = false;
  private adminListenerSubs: Subscription;
  setting = true
  settings: any;
  quantity=[0, 1,2,3,4,5,6,7,9, 10]

  constructor(
    private cardInfoService: cardService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private tools: AdminTools
  ) { }

  setSort(){
    this.setData.data.forEach(s=>{
      this.setName.push(s.name)
    })
    this.setName.sort()
  }
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
    //Auth info
    this.cardInfoService.getSetData().subscribe(
      res => {
        this.setData = res;
        this.setSort()
      }
    )
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
    this.cardInfoService.getcardInfo()
      .subscribe(data => {
        sessionStorage.setItem('cards', data.toString())
      })
  }
  //^^^^^^^^^^^^^^^^^^^^^^Search Cards^^^^^^^^^^^^^^^^^^^
  newCard = new FormGroup({
    cardName: new FormControl(''),
    white: new FormControl(''),
    blue: new FormControl(''),
    black: new FormControl(''),
    red: new FormControl(''),
    green: new FormControl(''),
    colourless: new FormControl(''),
    set: new FormControl(false)
  })
  onSubmit() {
    if (this.newCard.value.set == "Select a set") {
      this.newCard.value.set = false;
    }
    this.spinner.show()
    this.cardInfoService.viewCard(this.newCard.value).subscribe(
      res => {
        this.cards = res;
        this.spinner.hide()
      },
      err => {
        console.log(err)
      }
    );

  }
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  addToCart(name, price, quantity){
    quantity=2
    if(localStorage.getItem('myCart') === null){
      localStorage.setItem('myCart', '[]')
    }
    this.cart = JSON.parse(localStorage.getItem('myCart'))
    this.cart.push({'name' : name, 'price': price, 'quantity':quantity})
    let cart = JSON.stringify(this.cart)
    localStorage.setItem('myCart', cart)
    console.log(cart)
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.adminListenerSubs.unsubscribe();
  }

}