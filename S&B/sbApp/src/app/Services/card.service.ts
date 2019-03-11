import {Injectable} from '@angular/core';
import {CardInfo} from '../Shared/cardInfo.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs/observable'
import {map} from 'rxjs/operators'
import { delay } from 'q';
import { Params } from '@angular/router';
@Injectable({
    providedIn:'root'
})
export class cardService{

    baseUrl = environment.apiBaseUrl
    constructor(private http:HttpClient){
    }
    cardInfoURL = environment.apiBaseUrl+'/cardInfo'

    getcardInfo():Observable<CardInfo[]>{
        return this.http.get<CardInfo[]>(this.cardInfoURL)
    }

    getcardURL = environment.apiBaseUrl+'/card';
    viewCard(card:String){
        return this.http.post(this.getcardURL,card);
    }
    getCards(card:Params){
        return this.http.get(this.getcardURL,card);
    }
}