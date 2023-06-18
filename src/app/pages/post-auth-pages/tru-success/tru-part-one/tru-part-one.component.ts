import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRoutes } from 'src/app/shared/routes/api.routes';
import { APP_ROUTES } from 'src/app/shared/routes/app-routes';

import { DataService } from '../../../../shared/services/data.service';

@Component({
	selector: 'app-tru-part-one',
	templateUrl: './tru-part-one.component.html',
	styleUrls: ['./tru-part-one.component.scss']
})
export class TruPartOneComponent implements OnInit {
	questions: any[] = [];
	answerList: any[] = [];
	scores: number[] = [1, 2, 3, 4, 5];
	isSubmitAvailable: boolean = false;

	constructor(private readonly ds: DataService, private readonly router: Router) { }

	ngOnInit(): void {
		this.getInitialData();
	}

	private getInitialData(): void {
		const urls: string[] = [
			this.ds.formUrlParam(ApiRoutes.truPart1, { search: 'FREE' }),
			this.ds.formUrlParam(ApiRoutes.truQuestions, { search: "FREE" })
		];
		this.ds.forkJoin(urls).subscribe({
			next: (res) => {
				if (res.length) {
					this.answerList = res[0].results;
					this.questions = res[1].results.map((i: any) => {
						i['answer'] = this.answerList.find(a => a.question == i.id)?.answer;
						return i;
					});
					console.log(this.questions);
				}
			},
			error: (err) => console.error(err),
			complete: () => { }
		});
	}

	answer(item: any, score: number): void {
		if (item['answer']) {
			item['answer'] = score;
			const answerId: number = this.answerList.find(i => i.question == item.id).id;
			this.ds.put	(ApiRoutes.truPart1 + `${answerId}/`, { answer: score }).subscribe({
				next: (res: any) => {
					console.log(res);
				},
				error: (err) => console.log(err),
				complete: () => {}
			});
		} else {
			item['answer'] = score;
			this.ds.post(ApiRoutes.truPart1, { answer: score, question: item.id }).subscribe({
				next: (res: any) => {
					const index: number = this.questions.findIndex(k => !k.answer);
					if (index > -1) {
						this.isSubmitAvailable = false;
					} else {
						this.isSubmitAvailable = true;
					}
				},
				error: (err) => console.log(err),
				complete: () => { }
			});
		}
	}

	getReport(): void {
		this.router.navigate([APP_ROUTES.truPart1Report]);
	}
}