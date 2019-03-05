import { Component, OnInit } from '@angular/core';
import { cardService } from '../../Services/card.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
title='Home Component';
cardInfo=[]
constructor(private cardInfoService: cardService,
  private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.cardInfoService.getcardInfo()
    .subscribe(data => this.cardInfo = data)
  }

}
