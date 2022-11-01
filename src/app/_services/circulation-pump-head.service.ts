import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CirculationPumpHeadService {
    constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }
    
    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'            
        })
    }

    GetCirculationPumpHeadData(): Observable<any> {
        const requestURL = `/api/cp/getCpData`;
        return this.httpClient.get<any>(requestURL);        
    }
}