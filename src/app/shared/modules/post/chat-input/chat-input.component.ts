import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ApiRoutes } from 'src/app/shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';

@Component({
	selector: 'app-chat-input',
	templateUrl: './chat-input.component.html',
	styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {
	@Output() submitListener = new EventEmitter<any>();
	@Input() item: any;
	@Input() data: any;
	@Input() type!: string;
	@Input() placeholder!: string;
	@Input() textAreaWidth!: string;
	@Input() section?: any = 'timeline';
	profileDetail: any;
	isEmojiSelection: boolean = false;
	userInput: any = {
		comment: ''
	};
	image: any = {
		commentImg: ''
	};

	constructor(private readonly ds: DataService) {}

	ngOnInit(): void {
		console.log(this.section)
		this.profileDetail = this.ds.state.get('profileData');
	}

	emojiClick(e: any, item: any): void {
		if (!item) {
			const { comment } = this.userInput;
			const text = `${comment}${e.emoji.native}`;
			this.userInput.comment = text;
		} else {
			const text = `${this.userInput[item.id] ? this.userInput[item.id] : ''}${e.emoji.native}`;
			this.userInput[item.id] = text;
		}
	}

	onFileChanged(event: any, type: string, item: any): void {
		console.log(type)
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			const self: any = this;
			reader.onload = function () {
				if (type == 'comment') {
					self.image.commentImg = reader.result;
				} else {
					self.image[item.id] = reader.result;
				}
				// upload img to server
				const formdata: any = new FormData();
				formdata.append("file", event.target.files[0]);
				formdata.append("category", "Workshop");
				self.ds.post(ApiRoutes.upload, formdata).subscribe((res: any) => {
					if (res.fle) {
						if (type == 'comment') {
							self.image.commentImg = res.fle;
						} else {
							self.image[item.id] = res.fle;
						}
						if (item?.id) {
							document.getElementById("textarea-" + item.id)?.focus();
						} else {
							document.getElementById("parent-textarea-" + self.data.id)?.focus();
						}
					}
				});
			};
			reader.onerror = function (error) {
				console.log('Error: ', error);
			};
		}
	}

	ngModelChange(e: string, item: any): void {
		if (item?.id) {
			this.userInput[item.id] = e;
		} else {
			this.userInput.comment = e;
		}
	}

	getComment(): any {
		if (!this.image.commentImg) {
			return `<div>${this.userInput.comment}</div>`;
		} else {
			if (this.userInput.comment) {
				return `<div class='mb-2'>${this.userInput.comment}</div>` + `<img class='img-fluid w-50 pointer' src='${this.image.commentImg}'>`;
			} else {
				return `<img class='img-fluid w-50 pointer' src='${this.image.commentImg}'>`;
			}
		}
	}

	getReply(item: any): any {
		if (!this.image[item.id]) {
			return `<div>${this.userInput[item.id]}</div>`;
		} else {
			if (this.userInput[item.id]) {
				return `<div class='mb-2'>${this.userInput[item.id]}</div>` + `<img class='img-fluid w-50 pointer' src='${this.image[item.id]}'>`;
			} else {
				return `<img class='img-fluid w-50 pointer' src='${this.image[item.id]}'>`;
			}
		}
	}

	comment(): void {
		this.userInput.comment = this.userInput.comment.trim();
		if (this.userInput.comment || this.image.commentImg) {
			const payload: any = {
				[this.section]: this.data.id,
				comment: this.getComment(),
				parent: '',
				image: this.image.commentImg ? this.image.commentImg : null
			};
			this.submitListener.emit({ payload: payload, item: null });
			setTimeout(() => {
				this.userInput.comment = '';
				this.image.commentImg = '';
			}, 250);
		}
	}

	replyComment(item: any): void {
		this.userInput[item.id] = this.userInput[item.id]?.trim();
		if (this.userInput[item.id] || this.image[item.id]) {
			const payload: any = {
				[this.section]: this.data.id,
				comment: this.getReply(item),
				parent: item.id,
				image: this.image[item.id] ? this.image[item.id] : null
			};
			this.submitListener.emit({ payload: payload, item: item });
			setTimeout(() => {
				this.userInput[item.id] = '';
				this.image[item.id] = '';
			}, 250);
		}
	}
}