import { Component, OnInit } from '@angular/core';
import { cardService } from '../../Services/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
title='Home Component';
cardName:string = ""
cardInfo=[]
constructor(private cardInfoService: cardService,
  private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.cardInfoService.getcardInfo()
    .subscribe(data => this.cardInfo = data)
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
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

}
