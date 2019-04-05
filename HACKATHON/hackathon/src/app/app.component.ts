import { Component, OnInit } from '@angular/core';
import cardService from './service/cards';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cardData: any =[]
  ourCards:any=[]
  title = 'hackathon';
  constructor(private cards:cardService){}
  ngOnInit(){
    this.cards.getSetData().subscribe(
      res => {
        this.cardData = res;
      }
    )
  }
 /* createFile(name, set, image, description){
    return {name:name,set:set, image:image, description:description}
  }*/
  data(){
    this.cardData.data.map(card=>{
      
      //this.ourCards.push(this.createFile(card.name, card.set_name, card.image_uris.small, card.oracle_text))
    })
    console.log(this.ourCards)

  }
}
