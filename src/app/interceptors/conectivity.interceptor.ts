import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class InternetInterceptor implements HttpInterceptor {

    constructor() { }

    // retuns internet status
    get isOnline(): boolean {
        return navigator.onLine;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // check to see if there's internet
        if (!this.isOnline) {
            // if there is no internet, throw a throwError
            // since an error is thrown, the function will terminate here
            console.log('No internet connection');
            return throwError({ error: 'No internet connection' });
        } else {
            // else return the normal request
            return next.handle(request);
        }
    }
}