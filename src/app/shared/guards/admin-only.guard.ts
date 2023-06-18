import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { APP_ROUTES } from '../routes/app-routes';
import { DataService } from '../services/data.service';

@Injectable()
export class AdminOnlyGuard implements CanActivate {

	constructor(private auth: AuthService, private router: Router, private ds: DataService) { }

	canActivate() {
		const profileData: any = this.ds.state.get('profileData');
		if (profileData.role == 1) {
			return true;
		} else {
			this.router.navigate([APP_ROUTES.root]).then(() => {
                // To perform any async task
            });
			return false;
		}
	}
}