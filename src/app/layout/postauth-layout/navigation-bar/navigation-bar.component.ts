import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { APP_ROUTES } from '../../../shared/routes/app-routes';
import { DataService } from '../../../shared/services/data.service';
import { sideBarRoutes, ISideBar } from "./config";

@Component({
	selector: 'app-navigation-bar',
	templateUrl: './navigation-bar.component.html',
	styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
	routes: any = APP_ROUTES;
	subs: Subscription = new Subscription();
	menu: ISideBar[] = [];
	currentRoute!: string;
	sidebarHeader: any = {
		isBack: false,
		title: "",
		isVisible: false
	}
	profileDetail!: any;

	constructor(private readonly router: Router, private readonly ds: DataService) {
		const sub = this.ds.stateEvent$.subscribe((data: any) => {
			if (data) {
				this.profileDetail = this.ds.state.get('profileData');
				if (!!this.profileDetail) {
					this.loadSideBar(this.router.url);
				}
			}

		});
		this.subs.add(sub);
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

	ngOnInit(): void {
		this.profileDetail = this.ds.state.get('profileData');
		this.router.events.subscribe((val) => {
			if (val instanceof NavigationEnd) {
				this.loadSideBar(val.urlAfterRedirects);
			}
		});
		if (!!this.profileDetail) {
			this.loadSideBar(this.router.url);
		}
	}

	private loadSideBar(url: string): void {
		this.currentRoute = url;
		const routes: any = sideBarRoutes.filter((i: ISideBar) => i.roleAccessibility.includes(this.profileDetail.role));
		if (url.includes(APP_ROUTES.dashboard) || url.includes(APP_ROUTES.invites) || url.includes(APP_ROUTES.workshops) || url.includes(APP_ROUTES.topics) ||
			url.includes(APP_ROUTES.tru) || url.includes(APP_ROUTES.goal) || url.includes(APP_ROUTES.events) || url.includes(APP_ROUTES.tribes)
			|| url.includes(APP_ROUTES.plans) || url.includes(APP_ROUTES.subscriptions)) {
			this.sidebarHeader = {
				title: "",
				isBack: false,
				isVisible: false
			};
			this.menu = routes;
		} else if (url.includes(APP_ROUTES.profileEdit) || url.includes(APP_ROUTES.updateCreds) || url.includes(APP_ROUTES.billing) || url.includes(APP_ROUTES.userInvoices)|| url.includes(APP_ROUTES.userBadges) || url.includes(APP_ROUTES.networkSetting) || url.includes(APP_ROUTES.saveDraft) || url.includes(APP_ROUTES.soundSetting) || url.includes(APP_ROUTES.textToApp) || url.includes(APP_ROUTES.zoomProfile) || url.includes(APP_ROUTES.notificationSetting) || url.includes(APP_ROUTES.liveStreamRecording)  ) {
			console.log('url--->',url);
			this.sidebarHeader = {
				title: "Your Account",
				isBack: false,
				isVisible: true
			};
			this.menu = routes.find((i: ISideBar) => i.title == 'Your Account')!.children;
		} else if (url.includes(APP_ROUTES.members) || url.includes(APP_ROUTES.memberInvite) || url.includes(APP_ROUTES.memberMsg) ||
			url.includes(APP_ROUTES.downLoadMembers) || url.includes(APP_ROUTES.memberCommunication)) {
			this.sidebarHeader = {
				title: "Members",
				isBack: false,
				isVisible: true
			};
			this.menu = routes.find((i: ISideBar) => i.title == 'Members')!.children;
		}
		console.log(this.menu,'Abhra');
	}
}