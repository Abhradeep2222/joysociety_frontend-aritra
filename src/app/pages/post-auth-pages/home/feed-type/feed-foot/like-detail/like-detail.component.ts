import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-like-detail',
	templateUrl: './like-detail.component.html',
	styleUrls: ['./like-detail.component.scss']
})
export class LikeDetailComponent implements OnInit {
	@Input() data: any;
	records: any;
	recordCount!: number;

	constructor(private readonly activeModal: NgbActiveModal) { }

	ngOnInit(): void {
		console.log(this.data)
		if (this.data?.flag == 'like') {
			this.recordCount = this.data?.like_count;
			this.records = this.data?.like;
		} else if (this.data?.flag == 'comment') {
			this.recordCount = this.data?.comments.length;
			this.records = this.data?.comments;
		}
	}

	cancelAction(): void {
		this.activeModal.close();
	}
}