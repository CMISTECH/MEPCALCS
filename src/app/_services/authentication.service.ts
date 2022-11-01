import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as uuid from 'uuid';
import * as Base64 from 'crypto-js/enc-base64';
import * as hmacSHA512 from 'crypto-js/hmac-sha512';

import { environment } from 'src/environments/environment';

import { User } from '../_models';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    public currentUser: Observable<User>;

    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        })
    }

    constructor(private httpClient: HttpClient) {
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        const timestamp = Date.now();
        const nonce = uuid.v4();
        const author = Base64.stringify(hmacSHA512(email + nonce + timestamp, password));

        const requestURL = `${environment.apiUrl}/users/login`;

        return this.httpClient.post<any>(requestURL, { email, timestamp, nonce, author }, this.httpOptions)
            .pipe(map((res: any) => {
                if (res.successFlag) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    res.returnValue.email = email;
                    localStorage.setItem('currentUser', JSON.stringify(res.returnValue));
                    this.currentUserSubject.next(res.returnValue);
                }

                return res;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}