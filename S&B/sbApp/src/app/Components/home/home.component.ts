import { Component, OnInit } from '@angular/core';
import { cardService } from '../../Services/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Response } from 'selenium-webdriver/http';
import { AuthService } from 'src/app/Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Home Component';
  cardName: string = ""
  cardInfo = []
  cards: any = {}

  allDataFetched = false

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(
    private spinnerService: NgxSpinnerService, private cardInfoService: cardService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    for (let i = 0; i <= 100; i++) {
      this.cardInfo.push(`${i}`)
    }
  }

  ngOnInit() {
    //Auth info
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    //this.spinnerService.show();
    this.cardInfoService.getcardInfo()
      .subscribe(data => {
        console.log('trying to get')
        this.cardInfo = data;
        this.allDataFetched = true
        this.spinnerService.hide();
      })
  }
  //^^^^^^^^^^^^^^^^^^^^^^Search Cards^^^^^^^^^^^^^^^^^^^
  newCard = new FormGroup({
    cardName: new FormControl('')
  })

  onSubmit() {
    this.cardName = this.newCard.get('cardName').value;
    this.cardInfoService.viewCard(this.newCard.value).subscribe(
      res => {
        this.cards = res;
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
