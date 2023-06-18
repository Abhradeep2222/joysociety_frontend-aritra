import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { APP_ROUTES } from '../routes/app-routes';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private auth: AuthService, private router: Router) { }

	canActivate() {
		const isAuthenticated: boolean = this.auth.isAuthenticated();
		if (!isAuthenticated) {
			this.router.navigate([APP_ROUTES.root]).then(() => {
                // To perform any async task
            });
		}
		return true;
	}
}