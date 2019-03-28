import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "../Shared/auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
    private token: string;
    private tokenTimer: any;
    private isAuthenticated = false;
    private isAdmin = false;
    private authStatusListener = new Subject<boolean>();
    private adminStatusListener = new Subject<boolean>();


    constructor(private http: HttpClient, private router: Router) { }

    getIsAdmin(){
        return this.isAdmin;
    }

    getIsAdminStatusListener(){
        return this.adminStatusListener.asObservable();
    }

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    login(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };
        this.http
            .post<{ token: string; expiresIn: number, currentUser: string, currentUserId: string , role: string }>(
                "http://localhost:3000/api/login",
                authData
            )
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                if (token) {
                    const expiresInDuration = response.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    if(response.role === "admin"){
                        this.isAdmin = true;
                        this.adminStatusListener.next(true);
                    }
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    console.log(expirationDate);
                    this.saveAuthData(token, expirationDate,response.currentUser, response.currentUserId, response.role);
                    window.location.reload;
                    if(this.isAdmin != true){
                        this.router.navigate(["/customer"]);
                    }else{
                        this.router.navigate(["/admin"]);
                    }
                    
                }
            });
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
            if(authInformation.role === "admin"){
                this.isAdmin = true;
                this.adminStatusListener.next(true);
            }
        }
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.isAdmin = false;
        this.adminStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(["/login"]);
    }

    private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date, currentUser: string, currentUserId: string, role: string) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("currentUser", currentUser);
        localStorage.setItem("currentUserId", currentUserId);
        localStorage.setItem("role", role);

    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentUserId");
        localStorage.removeItem("role");


    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const role = localStorage.getItem("role");
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            role: role
        }
    }
}
