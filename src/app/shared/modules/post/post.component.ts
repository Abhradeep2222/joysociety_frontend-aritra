import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { DataService } from '../../services/data.service';
import { PostpopupComponent } from "./postpopup/postpopup.component";
import { PollpopupComponent } from "./pollpopup/pollpopup.component";
import { ApiRoutes } from '../../routes/api.routes';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
	id!:string;
	profileDetail!: any;
	eventDetail!: any;
	users: any[] = [];
	@Output() emitter = new EventEmitter();
	@Input() data?: any;

	constructor(private readonly ds: DataService,private readonly route: ActivatedRoute, private readonly ms: NgbModal) { }

	ngOnInit(): void {
		this.profileDetail = this.ds.state.get('profileData');
		this.ds.stateEvent$.subscribe((data: boolean) => {
			if (data) {
				this.profileDetail = this.ds.state.get('profileData');
			}
		});
	
	}

	// joinEvent(): void {
		// if (this.profileDetail?.zoom_link) {
		// 	window.open(this.profileDetail?.zoom_link, '_blank');
		// }
		// this.router.navigateByUrl('https://us06web.zoom.us/s/82578418996#success');
	// }

	openPostPopup(): void {
		const ngbModalOptions: NgbModalOptions = {
			// backdrop: 'static',
			keyboard: false,
			size: 'xl',
			centered: true
		};
		const modalRef: NgbModalRef = this.ms.open(PostpopupComponent, ngbModalOptions);
		modalRef.componentInstance.config = {
			title: "Invite",
			isCancelHidden: true
		};
		modalRef.componentInstance.data = this.data;
		modalRef.closed.subscribe((data: any) => {
			if (data) {
				this.emitter.emit(data);
			}
		});
	}

	openPollPopup(): void {
		const ngbModalOptions: NgbModalOptions = {
			keyboard: false,
			size: 'xl',
			centered: true
		};
		const modalRef: NgbModalRef = this.ms.open(PollpopupComponent, ngbModalOptions);
		modalRef.componentInstance.data = this.data;
		modalRef.closed.subscribe((data: any) => {
			if (data) {
				this.emitter.emit(data);
			}
		});
	}
}