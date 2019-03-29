import { Injectable } from '@angular/core';
import { Customer } from '../Shared/customer.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs/observable'
import { map } from 'rxjs/operators'
@Injectable({
    providedIn: 'root'
})
export class CustomerService {


    baseUrl = environment.apiBaseUrl
    constructor(private http: HttpClient) {
    }
    registerURL = environment.apiBaseUrl + '/register';
    postUser(customer: Customer) {
        return this.http.post(this.registerURL, customer);
    }

    customerURL = environment.apiBaseUrl + '/customers'

    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.customerURL)
    }
    //find a customer by id
    viewCustomer(id) {
        const uri = this.baseUrl + '/customers/' + id
        return this.http.get(uri).pipe(map(res => {
            return res
        }));
    }

    // update customer
    updateCustomer(id, first_name, last_name, email, credit, notes) {
        const uri = this.baseUrl + '/customers/update/' + id
        const selectedCustomer = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            credit: credit,
            notes: notes
        }

        this.http.post(uri, selectedCustomer)
            .subscribe(res => {
                console.log("customer updated")
            })
    }
    deleteCustomer(id) {
        const uri = this.baseUrl + '/customers/delete/' + id
        return this.http.get(uri).pipe(map(res => {
            return res
        }))
    }
    updateHistory(){

    }
}