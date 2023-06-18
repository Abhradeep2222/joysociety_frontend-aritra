import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Libs
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
// import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';

import { PreauthLayoutComponent } from './layout/preauth-layout/preauth-layout.component';
// import { PostauthLayoutComponent } from './layout/postauth-layout/postauth-layout.component';
// import { HeaderComponent } from "./layout/postauth-layout/header/header.component";

// services
import { LocalStorage } from "./shared/services/storage.service";
import { AuthService } from "./shared/services/auth.service";
import { AuthGuard, UnAuthGuard, MemberOnlyGuard, AdminOnlyGuard } from "./shared/guards";
import { InternetInterceptor, RequestInterceptor, ResponseInterceptor } from './interceptors';

// import { ProfileComponent } from './layout/postauth-layout/profile/profile.component';
// import { NotificationsComponent } from './layout/postauth-layout/notifications/notifications.component';
// import { ChatComponent } from './layout/postauth-layout/chat/chat.component';
// import { NavigationBarComponent } from './layout/postauth-layout/navigation-bar/navigation-bar.component';

@NgModule({
	declarations: [
		AppComponent,
		PreauthLayoutComponent,
		// PostauthLayoutComponent,
		// HeaderComponent,
		// ProfileComponent,
		// NotificationsComponent,
		// ChatComponent,
		// NavigationBarComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		ToastrModule.forRoot(),
		NgxSpinnerModule,
		// NgbDropdownModule,
		TagInputModule
	],
	providers: [
		LocalStorage,
		AuthService,
		AuthGuard,
		UnAuthGuard,
		AdminOnlyGuard,
		MemberOnlyGuard,
		{ provide: HTTP_INTERCEPTORS, useClass: InternetInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
		// { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
		
	],
	bootstrap: [AppComponent]
})

export class AppModule {
	// private cache: Map<string, any> = new Map();
	// constructor() {

	// 	this.cache.set('roles', 'value')
	// 	console.log(this.cache.get('test'))

		
	// }
}