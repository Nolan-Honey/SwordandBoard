import {Injectable} from '@angular/core';
import {Customer} from '../Shared/customer.model';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../environments/environment'

@Injectable({
    providedIn:'root'
})
export class CustomerService{

    selectedCustomer: Customer = {
        first_name:'',
        last_name:'',
        email:'',
        password:''
    }    
    constructor(private http:HttpClient){

    }

    postUser(customer:Customer){
        return this.http.post(environment.apiBaseUrl+'/register',customer)
    }
}