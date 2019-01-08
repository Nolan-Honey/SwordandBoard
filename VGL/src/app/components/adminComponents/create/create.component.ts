import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../../services/players.service'
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GamesService } from '../../../services/games.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  rank=[];
  games:any;
  statuses=[{id:1,st:'Available'},{id:2,st:'Unavailable'}]
  title = 'Add Player';
  angForm: FormGroup;
  constructor(private gservice: GamesService, private playerservice: PlayersService, private fb: FormBuilder, private router: Router ) {
 
   }
   getGames(){
    this.gservice.getGames().subscribe(res=>{
      this.games =res;
    })
  }
   createRanking(){
    for(var i=1;i<=100;i++){
      this.rank.push(i);
    }
    return this.rank;
  }
  createForm() {
    this.angForm = this.fb.group({
      playerName: ['', Validators.required ],
      rank: ['', Validators.required ],
      score: ['', Validators.required ],
      time: ['', Validators.required ],
      gamesPlayed: ['', Validators.required ],
      status: ['', Validators.required ]
   });
  }
  addPlayer(playerName, rank, score, time, gamesPlayed,status) {
    this.playerservice.addPlayer(playerName, rank, score, time, gamesPlayed,status,"Join Game");
      
  }
  ngOnInit() {
    this.getGames();
    this.createRanking();
    this.createForm();
  }
}