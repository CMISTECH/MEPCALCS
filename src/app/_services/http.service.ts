import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainService } from './main.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    // public uriPrefix = 'http://mepcalcs.jvmhost.net/modcalc-production';
    // public uriPrefix = 'http://lifehisto.jvmhost.net/modcalc-production'; //ORIGINAL
    // public uriPrefix = 'http://localhost:8080/modcalc-production';
    
    // public uriPrefix = '/api'
    public uriPrefix = 'https://www.mepcalcs.com/modcalc-production';
    
    constructor(private http: HttpClient, private mainService: MainService) {
    }

    get(uriSuffix: string, withoutAuth?: boolean): Observable<any> {
        let headers: any = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        };
        if (!withoutAuth && this.checkValues()) {
            headers.Authorization = this.mainService.user.Authorization;
            headers.email = this.mainService.user.email;
            headers.timestamp = this.mainService.user.timestamp.toString();
            headers.nonce = this.mainService.user.nonce;
        }
        return this.http.get<any>(this.uriPrefix + uriSuffix, {
            // headers: new HttpHeaders(headers)
        });
    }

    post(uriSuffix: string, body: object, withoutAuth?: boolean): Observable<any> {
        let headers: any = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0'
        };
        if (!withoutAuth) {
            headers.Authorization = this.mainService.user.Authorization;
            headers.email = this.mainService.user.email;
            headers.timestamp = this.mainService.user.timestamp.toString();
            headers.nonce = this.mainService.user.nonce;
        }
        return this.http.post<any>(this.uriPrefix + uriSuffix, body, {
            headers: new HttpHeaders(headers)
        });
    }

    private checkValues(): boolean {
        if (this.mainService === undefined || this.mainService == null)
            return false;
        if (this.mainService.user === undefined || this.mainService.user == null)
            return false;
        if (this.mainService.user.timestamp === undefined || this.mainService.user.timestamp == null)
            return false;
        return true;
    }

    getESTData(): Observable<any> {
        return this.get('/ets/getESTData');
    }

    calculateEST(body: object): Observable<any> {
        return this.post('/ets/calculate', body);
    }

    calculatePS(body: object): Observable<any> {
        return this.post('/pipesizer/calculate', body, true);
    }

    getPSData(): Observable<any> {
        return this.get('/pipesizer/getData', true);
    }

    getCpData(): Observable<any> {
        return this.get('/cp/getCpData');
    }

    calculateCP(body: object): Observable<any> {
        return this.post('/cp/calculate', body);
    }

    login(body: any) {
        return this.post('/users/login', body, true);
    }

    signup(user: any) {
        return this.post('/users/signUp', user, true);
    }

    confirmAccount(activationCode: string, email: string) {
        return this.http.post<any>(this.uriPrefix + '/users/confirmAccount', { activationCode, email }, {
            headers: new HttpHeaders(
                {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    Pragma: 'no-cache',
                    Expires: '0',
                    'Content-Type': 'application/json'
                }
            )
        });
    }

    resendCode(email: string) {
        return this.http.post<any>(this.uriPrefix + '/users/resendConfirmationCode', { email }, {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    Pragma: 'no-cache',
                    Expires: '0'
                }
            )
        });
    }

    getCountries() {
        return this.get('/users/getCountries', true);
    }

    getCableSizerData() {
        return this.get('/cablesizer/getData');
    }

    cableSizerCalc(body: any) {
        return this.post('/cablesizer/calculate', body, false);
    }

    voltagedropCalc(body: any) {
        return this.post('/voltagedrop/calculate', body, true);
    }

    solaranglesCalc(body: any) {
        return this.post('/solarangles/calculate', body, true);
    }

    drCalc(body: any) {
        return this.post('/dr/calculate', body, true);
    }

    hwCalc(body: any) {
        return this.post('/hw/calculate', body, true);
    }

    dwCalc(data: any) {
        let json = JSON.stringify(data);
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let url = this.uriPrefix + '/dw/calculate';
        // this.http.put(url, json, {headers: headers})
        // .map(res => res);
        let params = new HttpParams().set('json', json);
        return this.http.get(url, { params: params });
    }
}
