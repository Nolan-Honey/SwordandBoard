import { Component, OnInit } from '@angular/core';
import { cardService } from '../../Services/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Response } from 'selenium-webdriver/http';
import { AuthService } from 'src/app/Services/auth.service';
import { Subscription } from 'rxjs';
import { networkInterfaces } from 'os';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Home Component';
  cardName: string = ""
  cards: any = []
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(
    private cardInfoService: cardService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    //Auth info
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
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
    green: new FormControl('')
  })

  onSubmit() {
    console.log(this.newCard.value)
    this.spinner.show()
    // this.cardName = this.newCard.get('cardName').value;
    //this.cardInfoService.viewCard(this.newCard.value).subscribe(
      this.cardInfoService.viewCard(this.newCard.value).subscribe(
      res => {
        this.cards = res;
        this.spinner.hide()
        console.log(res)
      },
      err => {
        console.log(err)
      }
    );

  }
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
