import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';

@Component({
	selector: 'app-member-profile',
	templateUrl: './member-profile.component.html',
	styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {
	memberDetail!: any;
	id!: string;

	constructor(private readonly ds: DataService, private readonly route: ActivatedRoute, private readonly router: Router) {
		this.id = this.route.snapshot.params['id'];
	}

	ngOnInit(): void {
		this.getMemberDetail();
	}

	private getMemberDetail(): void {
		this.ds.get(ApiRoutes.memberDetail + `${this.id}/detail/`).subscribe({
			next: (res: any) => {
				console.log(res);
				if (res.id) {
					this.memberDetail = res;
				}
			},
			error: (err: any) => console.log(err),
			complete: () => {}
		});
	}

}
