import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRoutes } from 'src/app/shared/routes/api.routes';
import { APP_ROUTES } from 'src/app/shared/routes/app-routes';

import { DataService } from '../../../../shared/services/data.service';

@Component({
	selector: 'app-tru-part-two',
	templateUrl: './tru-part-two.component.html',
	styleUrls: ['./tru-part-two.component.scss']
})
export class TruPartTwoComponent implements OnInit {
	questions: any[] = [];
	answerList: any[] = [];
	scores: number[] = [1, 2, 3, 4, 5];
	isSubmitAvailable: boolean = false;
	payload: any = {
		page: 1,
		page_size: 40,
		search: "COMPREHENSIVE",
	};
	step: any[] = [];
	totalSteps: any[] = [];
	sliceStart: number = 0;
	sliceEnd: number = 8;
	itemPerPage: number = 8;
	currentStep: number = 1;

	constructor(private readonly ds: DataService, private readonly router: Router) { }

	ngOnInit(): void {
		this.getInitialData();
	}

	private getInitialData(): void {
		const urls: string[] = [
			this.ds.formUrlParam(ApiRoutes.truPart1, this.payload),
			this.ds.formUrlParam(ApiRoutes.truQuestions, this.payload)
		];
		this.ds.forkJoin(urls).subscribe({
			next: (res) => {
				if (res.length) {
					for (let j = 0; j < res[1].count / this.itemPerPage; j++) {
						this.totalSteps.push({ step: j + 1, status: (this.currentStep == j + 1) ? 'completed' : '' })
					}
					this.answerList = res[0].results;
					this.questions = res[1].results.map((i: any) => {
						i['answer'] = this.answerList.find(a => a.question == i.id)?.answer;
						return i;
					});
				}
			},
			error: (err) => console.error(err),
			complete: () => { }
		});
	}

	pageChange(): void {
		if (this.currentStep < this.totalSteps.length) {
			this.totalSteps[this.currentStep].status = 'completed';
			this.currentStep++;
			this.sliceStart = this.sliceStart + this.itemPerPage;
			this.sliceEnd = this.sliceEnd + this.itemPerPage;
		} else {
			this.router.navigate([APP_ROUTES.truPart2Report]);
		}
	}

	back(): void {
		if (this.currentStep <= this.totalSteps.length) {
			this.currentStep--;
			this.totalSteps[this.currentStep].status = '';
			this.sliceStart = this.sliceStart - this.itemPerPage;
			this.sliceEnd = this.sliceEnd - this.itemPerPage;
		}
	}

	answer(item: any, score: number): void {
		if (item['answer']) {
			item['answer'] = score;
			const answerId: number = this.answerList.find(i => i.question == item.id).id;
			this.ds.put(ApiRoutes.truPart1 + `${answerId}/`, { answer: score }).subscribe({
				next: (res: any) => {
					console.log(res);
				},
				error: (err) => console.log(err),
				complete: () => { }
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
}