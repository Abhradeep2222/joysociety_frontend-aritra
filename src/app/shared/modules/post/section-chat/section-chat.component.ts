import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { map, Subscription, timer } from 'rxjs';
import { ApiRoutes } from 'src/app/shared/routes/api.routes';

import { DataService } from '../../../../shared/services/data.service';

@Component({
	selector: 'app-section-chat',
	templateUrl: './section-chat.component.html',
	styleUrls: ['./section-chat.component.scss']
})
export class SectionChatComponent implements OnInit {
	@ViewChild('scrollMe') private myScrollContainer!: ElementRef;
	@Input() data: any;
	@Input() section: any;
	channelID!: number;
	subs: Subscription = new Subscription();
	chat: any[] = [];
	profileDetail!: any;

	constructor(private readonly ds: DataService) { }

	ngOnInit(): void {
		this.profileDetail = this.ds.state.get('profileData');
		console.log(this.section);
		console.log(this.data);
		this.createChannel();
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

	private createChannel(): void {
		this.ds.post(ApiRoutes.chatChannel, { [this.section]: this.data.id }).subscribe({
			next: (res) => {
				if (res.id) {
					this.channelID = res.id;
					this.loadChat();
				}
			},
			error: (err) => console.log(err),
			complete: () => { }
		});
	}

	private loadChat(): void {
		// timer(0, 3000) call the function immediately and every 3 seconds
		const temp = timer(0, 3000).pipe(
			map(() => {
				this.ds.get(`${ApiRoutes.getChat + this.channelID}/`).subscribe({
					next: (res) => {
						this.chat = res.reverse();
						this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
						console.log(this.chat);
					},
					error: (err) => console.log(err),
					complete: () => { }
				});
			})
		).subscribe();
		this.subs.add(temp);
	}

	submitListener(e: any): void {
		const payload: any = {
			channel: this.channelID,
			message: e.payload.comment
		};
		this.ds.post(ApiRoutes.createChatMessage, payload).subscribe({
			next: (res) => {
				if (res.id) {
					this.chat.push({
						author: true,
						channel: {
							id: this.channelID,
							tribe: null,
							users: [],
							workshop: this.data.id
						},
						id: null,
						message: payload.message,
						read: [],
						sender: {
							email: this.profileDetail.email,
							first_name: null,
							id: this.profileDetail.user_id,
							last_name: null,
							full_name: this.profileDetail.full_name,
							profile_pic: this.profileDetail.profile_pic,
						}
					});
					this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
				}
			},
			error: (err) => console.log(),
			complete: () => { }
		});
	}
}