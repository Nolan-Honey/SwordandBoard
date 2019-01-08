import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }
  getIDKey(){
    let myItem = localStorage.getItem("email");
      if(myItem == "nolanhoney2013@gmail.com"){
        return true;
      }
    else return false;
  }

}
