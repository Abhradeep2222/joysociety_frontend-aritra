import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { stepTwoInfo } from "../tru-config";
import { DataService } from "../../../../shared/services/data.service";
import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { APP_ROUTES } from '../../../../shared/routes/app-routes';

@Component({
	selector: 'app-tru-introduction',
	templateUrl: './tru-introduction.component.html',
	styleUrls: ['./tru-introduction.component.scss']
})
export class TruIntroductionComponent implements OnInit {
	view: number = 0;
	stepTwoInfo: any[] = stepTwoInfo;

	constructor(private readonly ds: DataService, private readonly router: Router) { }

	ngOnInit(): void {
		this.getIntiaData();
	}

	private getIntiaData(): void {
		const urls: string[] = [
			this.ds.formUrlParam(ApiRoutes.truPart1, { search: 'FREE' }),
			this.ds.formUrlParam(ApiRoutes.truPart1, { search: 'COMPREHENSIVE' }),
			this.ds.formUrlParam(ApiRoutes.truQuestions, { search: "FREE" }),
			this.ds.formUrlParam(ApiRoutes.truQuestions, { search: "COMPREHENSIVE" })
		];
		this.ds.forkJoin(urls).subscribe({
			next: (res) => {
				if (res.length) {
					if (!res[0].count && !res[1].count) {
						this.view = 1;
					} else if (res[0].count && !res[1].count) {
						if (res[0].count && res[0].count != res[2].count) {
							this.startPart1();
						} else if (res[0].count && res[0].count == res[2].count) {
							this.router.navigate([APP_ROUTES.truPart1Report]);
						}
					} else if (res[0].count && res[1].count) {
						if (res[1].count && res[1].count != res[3].count) {
							this.router.navigate([APP_ROUTES.truPart2]);
						} else if (res[1].count && res[1].count == res[3].count) {
							this.router.navigate([APP_ROUTES.truPart2Report]);
						}
					}
				}
			},
			error: (err) => console.error(err),
			complete: () => { }
		});
	}

	startPart1(): void {
		this.router.navigate([APP_ROUTES.truPart1]);
	}
}