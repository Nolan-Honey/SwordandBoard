import { Component, OnInit } from '@angular/core';
import cardService from './service/cards';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cardData: any =[]
  setData:any=[]
  title = 'hackathon';
  showCards=true;
  showSets=true
  constructor(private cards:cardService){}
  ngOnInit(){
    this.cards.getCardData().subscribe(
      res => {
        this.cardData = res;
      }
    )
    this.cards.getSetData().subscribe(
      res=>{
        this.setData=res
      }
    )
  }
  showC(){
    if(this.showCards){
      return this.showCards=false;
    }else{
      return this.showCards=true
    }
    
  }
  showS(){
    if(this.showSets){
      return this.showSets=false;
    }else{
      return this.showSets=true
    }
  }
}
