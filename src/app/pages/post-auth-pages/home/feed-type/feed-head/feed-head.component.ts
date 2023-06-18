import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-feed-head',
	templateUrl: './feed-head.component.html',
	styleUrls: ['./feed-head.component.scss']
})
export class FeedHeadComponent implements OnInit {
	@Input() data: any;
	profilePath:string=""
	
	constructor() { }

	ngOnInit(): void {
		this.profilePath=`/members/${this.data.content.user.id}`
	}
}
