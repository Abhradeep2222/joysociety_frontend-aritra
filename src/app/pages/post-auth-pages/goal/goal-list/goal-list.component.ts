import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { APP_ROUTES } from '../../../../shared/routes/app-routes';
import { DataService } from '../../../../shared/services/data.service';

@Component({
	selector: 'app-goal-list',
	templateUrl: './goal-list.component.html',
	styleUrls: ['./goal-list.component.scss']
})
export class GoalListComponent implements OnInit {
	routes: any = APP_ROUTES;
	listType!: string;
	goals: any[] = [];
	isLoading: boolean = true;
	count: number = 0

	constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly ds: DataService) {
		
	}

	ngOnInit(): void {
		if (!!this.route.snapshot.params && this.route.snapshot.params['id']) {
			this.listType = this.route.snapshot.params['id'];
			if (this.listType != "achieved" && this.listType != "pending") {
				this.router.navigate([APP_ROUTES.goal]);
				return;
			} else {
				this.getGoalList();
			}
		}
	}

	switchList(flag: string): void {
		this.listType = flag;
		this.getGoalList();
	}

	private getGoalList(): void {
		this.isLoading = true;
		this.goals = [];
		const url: string = this.ds.formUrlParam(ApiRoutes.goal, { status: this.listType == "achieved" ? 'Achieved' : 'In Progress' });
		this.ds.get(url).subscribe({
			next: (res: any) => {
				console.log(res);
				this.count = res.count;
				this.goals = res.results;
			},
			error: (err: any) => this.isLoading = false,
			complete: () => this.isLoading = false
		})
	}
}
