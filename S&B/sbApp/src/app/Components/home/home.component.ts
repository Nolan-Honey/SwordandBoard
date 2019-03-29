import { Component, OnInit } from '@angular/core';
import { cardService } from '../../Services/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Response } from 'selenium-webdriver/http';
import { AuthService } from 'src/app/Services/auth.service';
import { Subscription } from 'rxjs';
import { networkInterfaces } from 'os';
import { ErrorHandler, Injectable} from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Home Component';
  cardName: string = ""
  cards: any = []
  setData:any = []
  setName:any = []
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  isAdmin = false;
  private adminListenerSubs: Subscription;

  constructor(
    private cardInfoService: cardService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    //Auth info
    this.cardInfoService.getSetData().subscribe(
      res =>{
        this.setData = res;
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
        console.log('trying to get')
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
    colourless:new FormControl(''),
    set:new FormControl(false)
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
        console.log(res)
        console.log(this.newCard.value)
      },
      err => {
        console.log(err)
      }
    );

  }
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.adminListenerSubs.unsubscribe();
  }

}