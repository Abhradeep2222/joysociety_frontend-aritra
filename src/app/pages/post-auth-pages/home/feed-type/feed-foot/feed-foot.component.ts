import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiRoutes } from '../../../../../shared/routes/api.routes';

import { DataService } from '../../../../../shared/services/data.service';
import { LikeDetailComponent } from './like-detail/like-detail.component';

@Component({
	selector: 'app-feed-foot',
	templateUrl: './feed-foot.component.html',
	styleUrls: ['./feed-foot.component.scss']
})
export class FeedFootComponent implements OnInit {
	@Input() data: any;
	totalVotes: number = 0;
	profileDetail: any;

	constructor(private readonly ds: DataService, private readonly ms: NgbModal) {

	}

	ngOnInit(): void {
		this.profileDetail = this.ds.state.get('profileData');
		this.insertSelfLikeStatus(this.data.like, this.data);
		this.data.comments = this.data.comments.map((i: any) => {
			this.insertSelfLikeStatus(i.like, i);
			for (let replyIndex = 0; replyIndex < i.child.length; replyIndex++) {
				const el = i.child[replyIndex];
				this.insertSelfLikeStatus(el.like, el);
			}
			return i;
		});
		console.log("foot", this.data);
		if (this.data.content) {
			if (this.data.content._type == 'MULTIPLE CHOICE' || this.data.content._type == 'PERCENTAGE' || this.data.content._type == 'HOT COLD') {
				this.totalVotes = [...this.data.content.my_answer, ...this.data.content.answers].length;
			}
		}
	}

	insertSelfLikeStatus(arr: any[], parentObj: any): void {
		console.log("arr", arr);
		if (arr?.length) {
			const index: number = arr.findIndex((o: any) => o.id == this.profileDetail.user_id);
			if (index > -1) {
				parentObj['selfLike'] = true;
			} else {
				parentObj['selfLike'] = false;
			}
		}
	}

	scrollToView(): void {
		const id: number = this.data.comments[this.data.comments.length - 1].id
		const el: any = document.getElementById("comment-" + id);
		el.scrollIntoView();
	}

	isLiking: boolean = false;
	like(): void {
		this.isLiking = true;
		const payload: any = {
			like: this.profileDetail.user_id,
			flag: this.data['selfLike'] ? false : true,
		}
		this.ds.put(`${ApiRoutes.timeLine + this.data.id}/like/`, payload).subscribe({
			next: (res: any) => {
				if (res == 'success') {
					this.data['selfLike'] = payload.flag;
					if (payload.flag) {
						this.data.like_count++;
						this.data.like.push({
							email: this.profileDetail.email,
							first_name: "",
							last_name: "",
							full_name: this.profileDetail.full_name,
							id: this.profileDetail.user_id,
							profile_pic: this.profileDetail.profile_pic
						});
					} else {
						this.data.like_count--;
						const index: number = this.data.like.findIndex((i: any) => i.id == this.profileDetail.user_id);
						if (index > -1) {
							this.data.like.splice(index, 1);
						}
					}
					this.isLiking = false;
				}
			},
			error: (err: any) => {
				console.log(err)
				this.isLiking = false;
			},
			complete: () => { this.isLiking = false }
		});
	}

	showLikesComments(flag: string): void {
		if (!this.data.like_count) {
			return;
		}
		const ngbModalOptions: NgbModalOptions = {
			keyboard: false,
			size: 'md',
			centered: true
		};
		const modalRef: NgbModalRef = this.ms.open(LikeDetailComponent, ngbModalOptions);
		modalRef.componentInstance.data = { ...this.data, flag: flag };
	}
}