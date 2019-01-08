import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  result:any;
  constructor(private http: HttpClient) { }
  addPlayer(playerName, rank,score,time,gamesPlayed,status,join) {
    const uri = 'http://localhost:4000/players/add';
    const obj = {
      playerName:playerName ,
      rank:rank ,
      score:score,
      time:time ,
      gamesPlayed:gamesPlayed,
      status:status,
      join: join
    };
    this.http.post(uri, obj)
        .subscribe(res => console.log('Done'));
  }
  getPlayers(){
    const uri = 'http://localhost:4000/players';
    return this
            .http
            .get(uri)
            .pipe(map(res => {
              return res;
            }));
  }
  editPlayer(id) {
    const uri = 'http://localhost:4000/players/edit/' + id;
    return this
            .http
            .get(uri)
            .pipe(map(res => {
              return res;
            }));
  }
  updatePlayer(playerName, rank, score, time, gamesPlayed,status, id) {
    const uri = 'http://localhost:4000/players/update/' + id;

      const obj = {
        playerName:playerName ,
        rank:rank ,
        score:score,
        time:time ,
        gamesPlayed:gamesPlayed,
        status:status,
      };
    this
      .http
      .post(uri, obj)
      .subscribe(res => console.log('Done'));
  }
  playerGame(id) {
    const uri = 'http://localhost:4000/players/join/' + id;
    return this
            .http
            .get(uri)
            .pipe(map(res => {
              return res;
            }));
  }
  joinGame(playerName, rank, score, time, gamesPlayed,status, id) {
    const uri = 'http://localhost:4000/players/joingame/' + id;

      const obj = {
        playerName:playerName ,
        rank:rank ,
        score:score,
        time:time ,
        gamesPlayed:gamesPlayed,
        status:status,
      };
    this
      .http
      .post(uri, obj)
      .subscribe(res => console.log('Done'));
  }
  deletePlayer(id){
    const uri = 'http://localhost:4000/players/delete/' + id;

    return this
        .http
        .get(uri)
        .pipe(map(res => {
          return res;
        }));
  }
}
