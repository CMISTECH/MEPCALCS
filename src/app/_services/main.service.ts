import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class MainService {
    USER = 'calcUser';
    isLoggedIn!: boolean;
    user: any;

    constructor(private router: Router) {
        this.checkUser();
    }

    setUser(user: any) {
        this.isLoggedIn = true;
        localStorage.setItem(this.USER, JSON.stringify(user));
        this.user = user;
    }

    checkUser() {
        this.user = localStorage.getItem(this.USER);
        if (this.user) {
            this.user = JSON.parse(this.user);
            this.isLoggedIn = true;
        }
    }

    logout() {
        this.user = undefined;
        this.isLoggedIn = false;
        localStorage.removeItem(this.USER);
        this.router.navigate(['login']);
    }
}
