import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';
import { LikeDetailComponent } from 'src/app/pages/post-auth-pages/home/feed-type/feed-foot/like-detail/like-detail.component';
import { InfoPopupComponent } from 'src/app/shared/components/popups/info-popup/info-popup.component';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
	@Input() data: any;
	profileDetail: any;
	commentStartIndex: number = 0;
	commentEndIndex: number = 0;
	comments: any[] = [];
	replyVisibility: any = {};
	isLiking: boolean = false;

	constructor(private readonly ds: DataService, private readonly ms: NgbModal) { }

	ngOnInit(): void {
		this.profileDetail = this.ds.state.get('profileData');
		this.comments = [...this.data.comments];
		if (this.comments.length) {
			this.commentEndIndex = this.comments.length;
			if (this.comments.length > 5) {
				this.commentStartIndex = this.comments.length - 5;
			} else {
				this.commentStartIndex = 0;
			}
		}
	}

	loadPreviousComments(): void {
		if (this.commentStartIndex - 5 < 5) {
			this.commentStartIndex = 0;
		} else {
			this.commentStartIndex = this.commentStartIndex - 5;
		}
	}

	submitListener(e: any): void {
		this.submit(e.payload, e.item)
	}

	private submit(payload: any, item: any = null): void {
		this.ds.post(ApiRoutes.addComment, payload).subscribe({
			next: (res) => {
				if (!!res && res.id) {
					const obj: any = {
						comment: res.comment,
						id: res.id,
						like: [],
						like_count: 0,
						created_by: {
							email: this.profileDetail.email,
							first_name: "",
							last_name: "",
							full_name: this.profileDetail.full_name,
							id: this.profileDetail.user_id,
							profile_pic: this.profileDetail.profile_pic
						}
					}
					if (payload.parent) {
						const index: number = this.data.comments.findIndex((i: any) => i.id == payload.parent);
						if (index > -1) {
							this.data.comments[index].child.push(obj);
							this.comments = [...this.data.comments];
						}
					} else {
						obj.child = [];
						this.data.comments.push(obj);
						this.comments = [...this.data.comments];
						this.commentEndIndex++;
					}
				}
			},
			error: (err) => console.log(err),
			complete: () => { }
		});
	}

	deleteComment(comment: any, isReply?: boolean, index?: number): void {
		const ngbModalOptions: NgbModalOptions = {
			keyboard: false,
			size: 'md',
			centered: true
		};
		const modalRef: NgbModalRef = this.ms.open(InfoPopupComponent, ngbModalOptions);
		modalRef.componentInstance.data = {
			info: `<div class="text-center">
			<h5 class='mb-4'>Are you sure you want to delete this comment?</h5>
			</div>`,
			btnContainerClass: "d-flex gap-4",
			okBtn: "Yes",
			okBtnClass: "btn-success fw-bold f-x-small w-50",
			cancelBtn: "No",
			cancelBtnClass: "btn-secondary-outline fw-bold f-x-small w-50",
		};
		modalRef.closed.subscribe((data: any) => {
			if (data) {
				this.ds.delete(ApiRoutes.feedTimeLine + `${comment.id}/delete/`).subscribe({
					next: () => {
						if (isReply) {
							const index: number = this.data.comments.findIndex((i: any) => i.id == comment.id);
							if (index > -1) {
								this.data.comments.splice(index, 1);
								this.comments = this.data.comments;
							}
						} else {
							const childIndex: number = this.data.comments[index!].child.findIndex((i: any) => i.id == comment.id);
							if (childIndex > -1) {
								this.data.comments[index!].child.splice(childIndex, 1);
								this.comments = this.data.comments;
							}
						}
					},
					error: (err: any) => console.log(err),
					complete: () => { }
				})
			}
		});
	}

	like(item: any): void {
		console.log(item);
		this.isLiking = true;
		const payload: any = {
			like: this.profileDetail.user_id,
			flag: item['selfLike'] ? false : true,
		};
		this.ds.put(`${ApiRoutes.timeLine + 'comment/' + item.id}/like/`, payload).subscribe({
			next: (res: any) => {
				if (res == 'success') {
					item['selfLike'] = payload.flag;
					if (payload.flag) {
						item.like_count++;
						item.like.push({
							email: this.profileDetail.email,
							first_name: "",
							last_name: "",
							full_name: this.profileDetail.full_name,
							id: this.profileDetail.user_id,
							profile_pic: this.profileDetail.profile_pic
						});
					} else {
						item.like_count--;
						const index: number = item.like.findIndex((i: any) => i.id == this.profileDetail.user_id);
						if (index > -1) {
							item.like.splice(index, 1);
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

	showLikes(item: any): void {
		const ngbModalOptions: NgbModalOptions = {
			keyboard: false,
			size: 'md',
			centered: true
		};
		const modalRef: NgbModalRef = this.ms.open(LikeDetailComponent, ngbModalOptions);
		modalRef.componentInstance.data = { ...item, flag: 'like' };
	}
}