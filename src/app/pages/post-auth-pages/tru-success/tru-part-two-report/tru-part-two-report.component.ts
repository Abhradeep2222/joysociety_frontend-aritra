import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { APP_ROUTES } from 'src/app/shared/routes/app-routes';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';
import { InfoPopupComponent } from "../../../../shared/components/popups/info-popup/info-popup.component";

@Component({
	selector: 'app-tru-part-two-report',
	templateUrl: './tru-part-two-report.component.html',
	styleUrls: ['./tru-part-two-report.component.scss']
})
export class TruPartTwoReportComponent implements OnInit {
	routes: any = APP_ROUTES;
	report: any;
	maxScores: any[] = [];
	lowScores: any[] = [];

	constructor(private readonly ds: DataService, private readonly router: Router, private readonly ms: NgbModal) { }

	ngOnInit(): void {
		this.getReport();
	}

	private getReport(): void {
		this.ds.get(this.ds.formUrlParam(ApiRoutes.truSuccessReport, {report_type: 'COMPREHENSIVE', per_page: 40})).subscribe({
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

	done(): void {
		const ngbModalOptions: NgbModalOptions = {
			keyboard: false,
			size: 'sm',
			centered: true
		};
		const modalRef: NgbModalRef = this.ms.open(InfoPopupComponent, ngbModalOptions);
		modalRef.componentInstance.data = {
			info: `<h5 class='text-center'>Are you sure want to visit Goal Setting?</h5>`,
			btnContainerClass: "mt-4 d-flex gap-2",
			okBtn: "Yes",
			okBtnClass: "btn-secondary-outline fw-bold f-x-small w-50",
			cancelBtn: "No",
			cancelBtnClass: "btn-success fw-bold f-x-small w-50",
		};
		modalRef.closed.subscribe((data: any) => {
			if (data) {
				this.router.navigate([APP_ROUTES.goal]);
			}
		});
	}

	downloadReport(): void {
		const url: string = this.ds.formUrlParam(ApiRoutes.downloadTruReport, {report_type: 'COMPREHENSIVE'})
		this.ds.downloadDocumentBlob(url, 'part-2', '.pdf').subscribe({
			next: (res: any) => {},
			error: (err) => console.log(err),
			complete: () => { }
		});
	}
}