import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { APP_ROUTES } from 'src/app/shared/routes/app-routes';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';
import { InfoPopupComponent } from "../../../../shared/components/popups/info-popup/info-popup.component";

@Component({
	selector: 'app-tru-part-one-report',
	templateUrl: './tru-part-one-report.component.html',
	styleUrls: ['./tru-part-one-report.component.scss']
})
export class TruPartOneReportComponent implements OnInit {
	report: any;
	maxScores: any[] = [];
	lowScores: any[] = [];
	profileDetail!: any;

	constructor(private readonly ds: DataService, private readonly router: Router, private readonly ms: NgbModal) { }

	ngOnInit(): void {
		this.profileDetail = this.ds.state.get('profileData');
		this.getReport();
	}

	private getReport(): void {
		this.ds.get(ApiRoutes.truSuccessReport).subscribe({
			next: (res: any) => {
				if (!!res) {
					if (!res.report.length) {
						this.router.navigate([APP_ROUTES.tru]);
						return;
					}
					this.report = res;
					this.maxScores = res.report.filter((k: any) => k.score == res.highest);
					this.lowScores = res.report.filter((k: any) => k.score == res.lowest);
				}
			},
			error: (err) => console.log(err),
			complete: () => { }
		})
	}

	downloadReport(): void {
		this.ds.downloadDocumentBlob(ApiRoutes.downloadTruReport, 'part-1', '.pdf').subscribe({
			next: (res: any) => {},
			error: (err) => console.log(err),
			complete: () => { }
		});
	}

	done(): void {
		const ngbModalOptions: NgbModalOptions = {
			keyboard: false,
			size: 'sm',
			centered: true
		};
		const modalRef: NgbModalRef = this.ms.open(InfoPopupComponent, ngbModalOptions);
		modalRef.componentInstance.data = {
			info: `<h5 class='text-center'>Are you sure want to Visit home page?</h5>`,
			btnContainerClass: "mt-4 d-flex gap-2",
			okBtn: "Yes",
			okBtnClass: "btn-secondary-outline fw-bold f-x-small w-50",
			cancelBtn: "No",
			cancelBtnClass: "btn-success fw-bold f-x-small w-50",
		};
		modalRef.closed.subscribe((data: any) => {
			if (data) {
				this.router.navigate([APP_ROUTES.root]);
			}
		});
	}

	gotoPart2(): void {
		if ((this.profileDetail.role == 1 || this.profileDetail.role == 2 || this.profileDetail.role == 3) && this.profileDetail.membership_completion == 'completed') {
			this.router.navigate([APP_ROUTES.truPart2]);
		} else {
			const ngbModalOptions: NgbModalOptions = {
				keyboard: false,
				size: 'md',
				centered: true
			};
			const modalRef: NgbModalRef = this.ms.open(InfoPopupComponent, ngbModalOptions);
			modalRef.componentInstance.data = {
				info: `<h5 class='text-center'>"You're making progress! Upgrade to a premium membership now to take the next step to holistic success."</h5>`,
				btnContainerClass: "mt-4 d-flex gap-2 justify-content-center",
				okBtn: "Upgrade Now",
				okBtnClass: "btn-success fw-bold f-x-small px-5",
				cancelBtn: "",
				cancelBtnClass: "",
			};
			modalRef.closed.subscribe((data: any) => {
				if (data) {
					this.router.navigate([APP_ROUTES.goal]);
				}
			});
		}
	}
}
