import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreauthLayoutComponent } from './layout/preauth-layout/preauth-layout.component';
import { PostauthLayoutComponent } from './layout/postauth-layout/postauth-layout.component';
import { APP_ROUTES } from "./shared/routes/app-routes";
import { PRE_AUTH_ROUTES } from "./shared/routes/preauth-layout.routes";
import { POST_AUTH_ROUTES } from "./shared/routes/postauth-layout.routes";
import { AuthGuard } from './shared/guards';

const appRoutes: Routes = [
	{ 
		path: APP_ROUTES.root, 
		redirectTo: APP_ROUTES.login, 
		pathMatch: 'full' 
	},
    { 
    	path: APP_ROUTES.root, 
    	component: PreauthLayoutComponent,
    	data: { title: 'Pre Auth Views' }, 
    	children: PRE_AUTH_ROUTES 
    },
	{ 
		path: APP_ROUTES.root, 
		component: PostauthLayoutComponent, 
		data: { title: 'Post Auth Views' }, 
		children: POST_AUTH_ROUTES, 
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}