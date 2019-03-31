import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  items: any;
  total=0.0
  subtotal=0.0
  tax=0.0

  constructor() { }

  ngOnInit() {
    this.items = JSON.parse(localStorage.getItem('myCart'))
    this.items.forEach(item=>{
      this.subtotal+=(item.price*item.quantity)
    })
    this.subtotal=parseFloat(this.subtotal.toFixed(2))
    this.tax=parseFloat((this.subtotal*0.13).toFixed(2))
    this.total=parseFloat((this.tax+this.subtotal).toFixed(2))
  
  }

  removeItem(id){
    console.log('1a: ' +this.subtotal)
    console.log('2a: '+this.tax)
    console.log('3a: '+this.total)
    this.items.forEach(item=>{
      if(item.id == id){
        this.subtotal = this.subtotal-item.price
      }
    })
    this.subtotal=parseFloat(this.subtotal.toFixed(2))
    console.log('1b: '+this.subtotal)
    this.tax=parseFloat((this.subtotal*0.13).toFixed(2))
    console.log('2b: '+this.tax)
    this.total=parseFloat((this.tax+this.subtotal).toFixed(2))
    console.log('3b: '+this.total)
    let index = this.items.findIndex(i => i.id === id)

    this.items.splice(index, 1)
    localStorage.setItem('myCart', JSON.stringify(this.items))
  }
}
