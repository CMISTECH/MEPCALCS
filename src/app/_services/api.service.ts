import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class APIService {
    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        })
    }

    constructor(private httpClient: HttpClient) { }

    getCPData(): Observable<any> {
        const requestURL = `${environment.apiUrl}/cp/getCpData`;
        return this.httpClient.get<any>(requestURL, this.httpOptions)
    }

    calculateCPHead(body: any) : Observable<any> {
        const requestURL = `${environment.apiUrl}/cp/calculate`;
        return this.httpClient.post(requestURL, body, this.httpOptions)
    }

    calculateBPHead(body: any) : Observable<any> {
        const requestURL = `${environment.apiUrl}/cp/calculate`;
        return this.httpClient.post(requestURL, body, this.httpOptions)
    }

    calculatePipeSizer(body: any) : Observable<any> {
        const requestURL = `${environment.apiUrl}/pipesizer/calculate`;
        return this.httpClient.post(requestURL, body, this.httpOptions)
    }

    getESTData(): Observable<any> {
        const requestURL = `${environment.apiUrl}/ets/getESTData`;
        return this.httpClient.get<any>(requestURL, this.httpOptions)
    }

    calculateExpansionTankSizer(body: any) : Observable<any> {
        const requestURL = `${environment.apiUrl}/ets/calculate`;
        return this.httpClient.post(requestURL, body, this.httpOptions)
    }

}