import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-question-poll',
	templateUrl: './question-poll.component.html',
	styleUrls: ['./question-poll.component.scss']
})
export class QuestionPollComponent implements OnInit {
	@Input() data: any;
	
	constructor() { }

	ngOnInit(): void {
		// console.log(this.data)
	}

}
