import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GamesService } from '../../../services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
title='Games View'
games:any;
  constructor(private http:HttpClient, private service:GamesService) { }

  ngOnInit() {
    this.getGames();
  }
  getGames(){
    this.service.getGames().subscribe(res=>{
      this.games =res;
    })
  }

}
