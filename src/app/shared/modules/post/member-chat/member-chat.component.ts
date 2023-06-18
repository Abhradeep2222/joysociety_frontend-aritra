import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ChatAdapter } from 'ng-chat';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';
// import { DemoAdapter } from './chat-adapter';

@Component({
	selector: 'app-member-chat',
	templateUrl: './member-chat.component.html',
	styleUrls: ['./member-chat.component.scss']
})
export class MemberChatComponent implements OnInit {
	membersPayload: any = {
		page: 1,
		page_size: 500,
		search: "",
		ordering: "-created_on",
		role_id: ""
	};
	isLoadingMember: boolean = true;
	memberList: any[] = [];
	searchText: string = '';
	profileDetail: any;
	// title = 'app';
	// userId = 999;
	// public adapter: ChatAdapter = new DemoAdapter();

	constructor(private readonly ds: DataService) { }

	ngOnInit(): void {
		this.profileDetail = this.ds.state.get('profileData');
		this.getMemberList();
	}

	private getMemberList(): void {
		this.isLoadingMember = true;
		this.memberList = [];
		this.ds.get(this.ds.formUrlParam(ApiRoutes.memberList, this.membersPayload)).subscribe({
			next: (res: any) => {
				if (res.count) {
					this.memberList = res.results.filter((i: any) => i.user_id != this.profileDetail.user_id)
				}
			},
			error: (err) => console.error(err),
			complete: () => { this.isLoadingMember = false; }
		});
	}

}


@Pipe({
	name: "searchFilter"
})

export class SearchFilterPipe implements PipeTransform {
	transform(value: any, args?: any): any {
		if (!value) return null;
		if (!args) return value;

		args = args.toLowerCase();
		return value.filter((item: any) => {
			return JSON.stringify(item).toLowerCase().includes(args);
		});
	}
}