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
}
