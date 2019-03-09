import { Component, OnInit } from '@angular/core';
import { cardService } from '../../Services/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Response } from 'selenium-webdriver/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
title='Home Component';
cardName:string = ""
cardInfo=[]
cards:any = {}

allDataFetched=false
constructor(private spinnerService: NgxSpinnerService, private cardInfoService: cardService,
  private route: ActivatedRoute, private router: Router){
    for(let i=0;i<=100;i++){
      this.cardInfo.push(`${i}`)
    }
  }

  ngOnInit() {
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
      cardName : new FormControl('')
    })
  
    onSubmit(){
      this.cardName = this.newCard.get('cardName').value;
      this.cardInfoService.viewCard(this.newCard.value).subscribe(
        res => {
          console.log(res)
        },
        err => {
          console.log(err)
        }
    );
    // this.cardName = this.newCard.get('cardName').value;
    // this.cardInfoService.viewCard(this.newCard.value).subscribe(data => this.cards = data);
    // setTimeout(function(){
    //   console.log("Jan");
    // },5000)
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

}
