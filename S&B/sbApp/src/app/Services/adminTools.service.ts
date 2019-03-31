import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Settings } from '../Shared/adminTools.model';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs/observable'

@Injectable({ providedIn: "root" })
export class AdminTools {
    baseUrl = environment.apiBaseUrl

    constructor(private http: HttpClient, private router: Router) { }

    updateSettings(id,login,price, stock,credit) {
        const uri = this.baseUrl + '/settings/update/'+id
        const selectedSettings = {
            Login: login,
            Pricing: price,
            Stock: stock,
            Credit: credit
        }
        this.http.post(uri, selectedSettings)
            .subscribe(res => {
                console.log("Settings updated")
            })
    }

    settingsURL = environment.apiBaseUrl + '/settings'

    getSettings(): Observable<Settings[]> {
        return this.http.get<Settings[]>(this.settingsURL)
    }
    
    viewSettings(id) {
        const uri = this.baseUrl + '/settings/' + id
        return this.http.get(uri).pipe(map(res => {
            return res
        }));
    }

}