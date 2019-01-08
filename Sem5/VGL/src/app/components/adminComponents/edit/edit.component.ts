import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from '../../../services/players.service';
import { GamesService } from '../../../services/games.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  player: any;
  angForm: FormGroup;
  games:any;
  rank=[];
  title = 'Edit Player';
  statuses=[{id:1,st:'Available'},{id:2,st:'Unavailable'}]
  constructor(private gservice: GamesService, private route: ActivatedRoute, private router: Router, private service: PlayersService, private fb: FormBuilder) {
    this.createForm();
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
      playerName: ['' ],
      rank: [''],
      newrank: [''],
      score: ['' ],
      time: ['' ],
      gamesPlayed: ['' ],
      status: ['' ]
   });
  }
  
  check(status){
console.log(status);
  }
  updatePlayer(playerName, rank, score, time, gamesPlayed,status) {
    this.route.params.subscribe(params => {
    this.service.updatePlayer(playerName, rank, score, time, gamesPlayed,status, params['id']);
    this.router.navigate(['index']);
  });
}


  ngOnInit() {
    this.getGames();
    this.createRanking();
    this.route.params.subscribe(params => {
      this.player = this.service.editPlayer(params['id']).subscribe(res => {
        this.player = res;
      });
    });
  }
}
