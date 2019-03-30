import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  items: any;


  constructor() { }

  ngOnInit() {
    this.items = JSON.parse(localStorage.getItem('myCart'))
  }

  removeItem(name){
    console.log(this.items)
    let index = this.items.findIndex(i => i.name === name)
    this.items.splice(index, 1)
    localStorage.setItem('myCart', JSON.stringify(this.items))
  }
}
