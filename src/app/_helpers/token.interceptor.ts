import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser = this.authenticationService.currentUserValue;
        
        if (currentUser && currentUser.Authorization) {
            request = request.clone({
                setHeaders: {
                    'Authorization': currentUser.Authorization,
                    'timestamp': currentUser.timestamp.toString(),
                    'nonce': currentUser.nonce,
                    'email' : 'm.jarange@gmail.com'
                }            
            });
        }

        return next.handle(request);
    }
}