import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    private cache: Map<HttpRequest<any>, HttpResponse<any>> = new Map();

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     if (req.method == "GET") {
    //         return next.handle(req)
    //     }
    //     // if (req.headers.get("reset")) {
    //     //     this.cache.delete(req)
    //     // }
    //     // const cachedResponse: HttpResponse<any> | undefined = this.cache.get(req)
    //     // if (cachedResponse) {
    //     //     return of(cachedResponse!.clone())
    //     // }
    // }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((ev: HttpEvent<any>) => {
                if (ev instanceof HttpRequest) {
                    console.log(request)
                }
                if (ev instanceof HttpResponse) {
                    if (request.method == 'GET' && request.url == 'http://35.84.158.122/user/roles/') {
                        // console.log(ev)
                        // console.log(request);
                    }
                }
            })
        );
    }
}