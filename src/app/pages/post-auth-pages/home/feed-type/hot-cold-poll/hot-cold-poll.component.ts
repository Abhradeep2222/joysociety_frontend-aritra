import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LabelType, Options } from "@angular-slider/ngx-slider";

@Component({
	selector: 'app-hot-cold-poll',
	templateUrl: './hot-cold-poll.component.html',
	styleUrls: ['./hot-cold-poll.component.scss']
})
export class HotColdPollComponent implements OnInit {
	@Input() data: any;
	@Output() answerListener = new EventEmitter<any>();
	value: number = 50;
	publicValue: number = 0;
	options: Options = {
		floor: 0,
		ceil: 100,
		step: 0,
		showTicks: false,
		disabled: false,
		translate: (value: number, label: LabelType): string => {
			switch (label) {
				case LabelType.Low:
					return value + "%";
				case LabelType.High:
					return value + "%";
				default:
					return value + "%";
			}
		}
	};
	publicOptions: Options = {
		floor: 0,
		ceil: 100,
		step: 0,
		showTicks: false,
		disabled: true,
		translate: (value: number, label: LabelType): string => {
			switch (label) {
				case LabelType.Low:
					return value + "%";
				case LabelType.High:
					return value + "%";
				default:
					return value + "%";
			}
		}
	};
	pointerClass!: string;

	constructor() { }

	ngOnInit(): void {
		if (this.data.content.my_answer.length) {
			this.value = this.data.content.my_answer[0];
			this.options.disabled = true;
		}
		// if (this.data.content.answers.length) {
			this.publicValue = this.avg();
		// }
	}

	private avg(): number {
		const allAnswers: any[] = [...this.data.content.answers, ...this.data.content.my_answer]
		this.publicValue = allAnswers.reduce((prev: any, curr: any) => {
			return (Number(prev) || 0) + (Number(curr) || 0);
		});
		return this.publicValue / allAnswers.length;
	}

	onChangeEnd(e: any): void {
		this.options.disabled = true;
		this.answerListener.emit({ data: this.data, answer: e.value });
		
	}
}