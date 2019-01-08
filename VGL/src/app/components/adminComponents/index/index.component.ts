import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayersService } from '../../../services/players.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  title='Admin Player Options';
  players:any;
  constructor(private http: HttpClient, private service: PlayersService) { 
    
  }
  

  ngOnInit() {
    this.getPlayers();
    
  }

  getPlayers(){
    this.service.getPlayers().subscribe(res=>{
      this.players =res;
    })
  }
  deletePlayer(id) {
    this.service.deletePlayer(id).subscribe(res => {
      console.log('Deleted');
    });
  }
}
