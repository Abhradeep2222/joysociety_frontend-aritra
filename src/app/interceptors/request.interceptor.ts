import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { LocalStorage } from '../shared/services/storage.service';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
// import { environment } from '../../environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
	
	constructor(private ls: LocalStorage, public auth: AuthService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// const data = this.ls.getItem('joy-token');
		const token: string = (this.auth.isAuthenticated() && this.ls.getItem('joy-token')) ? `Token ${this.auth.token}` : '';
		// if (!!data && data.userData && !!data.userData.token && data.userData.token !== '') {
		request = request.clone({
			setHeaders: {
				Authorization: token,
				// 'client-id': environment.client_id,
				// 'Client-Secret': environment.clientSecret
			}
		});
		// }
		return next.handle(request);
	}
}