import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayersService } from '../../../services/players.service';
import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
title='Player View'
  players:any;
  constructor(private http: HttpClient, private service: PlayersService, public auth: AuthService) { 
    
  }
  

  ngOnInit() {
    this.getPlayers();
    
  }

  getPlayers(){
    this.service.getPlayers().subscribe(res=>{
      this.players =res;
    })
  }
}

