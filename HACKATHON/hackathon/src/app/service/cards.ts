import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn:'root'
})
export default class cardService{
    constructor(private http:HttpClient){
    }
    getCardData(){
        return this.http.get('https://api.scryfall.com/cards')
    }
    getSetData(){
        return this.http.get('https://api.scryfall.com/sets')
    }
}