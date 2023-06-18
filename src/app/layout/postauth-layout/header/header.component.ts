import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { DataService } from "../../../shared/services/data.service";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [   // :enter is alias to 'void => *'
				style({ opacity: 0 }),
				animate(1000, style({ opacity: 1 }))
			]),
			transition(':leave', [   // :leave is alias to '* => void'
				animate(1000, style({ opacity: 0 }))
			])
		])
	]
})
export class HeaderComponent implements OnInit {
	profileDetail!: any;

	constructor(private readonly ds: DataService) { }

	ngOnInit(): void {
		this.profileDetail = this.ds.state.get('profileData');
		this.ds.stateEvent$.subscribe((data: boolean) => {
			if (data) {
				this.profileDetail = this.ds.state.get('profileData');
			}
		});
	}
}