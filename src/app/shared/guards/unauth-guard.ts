import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { APP_ROUTES } from '../routes/app-routes';

@Injectable()

export class UnAuthGuard implements CanActivate {

	constructor(private auth: AuthService, private router: Router) { }

	canActivate() {
		return this.condition(this.auth.isAuthenticated());
    }
    
    private condition(isAuthenticated: boolean): boolean {
        if (isAuthenticated) {
            this.router.navigate([APP_ROUTES.dashboard]).then(() => {
				// To perform some async task
			});
        }
        return !isAuthenticated;
    }
}