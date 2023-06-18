import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';

@Component({
	selector: 'app-multiple-choice-poll',
	templateUrl: './multiple-choice-poll.component.html',
	styleUrls: ['./multiple-choice-poll.component.scss']
})
export class MultipleChoicePollComponent implements OnInit {
	@Input() data: any;
	@Output() answerListener = new EventEmitter<any>();
	profileDetail!: any;
	
	constructor(private readonly ds: DataService) { }

	ngOnInit(): void {
		this.profileDetail = this.ds.state.get('profileData');
		this.data.content['votes'] = [];
		const allAnswers: string[] = [...this.data.content.answers, ...this.data.content.my_answer];
		for (let i = 0; i < this.data.content?.answer_choice.length; i++) {
			this.data.content['votes'].push({
				choice: this.data.content.answer_choice[i],
				count: allAnswers.filter(j => j == this.data.content.answer_choice[i]).length,
				percentage: Math.round(allAnswers.filter(j => j == this.data.content.answer_choice[i]).length * 100 / allAnswers.length) || 0
			});
		}
	}

	chooseAnswer(answer: any): void {
		if (!this.data.content.my_answer.length) {
			const e: any = { value: answer }
			this.answerListener.emit({ data: this.data, answer: e.value });
		}
	}
}