import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';
import { APP_ROUTES } from '../../../../shared/routes/app-routes';
import { ToastService } from '../../../../shared/services/toastr.service';

@Component({
	selector: 'app-workshop-form',
	templateUrl: './workshop-form.component.html',
	styleUrls: ['./workshop-form.component.scss']
})
export class WorkshopFormComponent implements OnInit {
	isSubmitting: boolean = false;
	form!: FormGroup;
	view: number = 1;
	id!: string;
	workshopDetail!: any;
	memberList: any[] = [];

	constructor(private ds: DataService, private readonly spinner: NgxSpinnerService, private readonly router: Router, private readonly route: ActivatedRoute, private readonly toastr: ToastService) { }

	ngOnInit(): void {
		this.intiForm();
		this.getMembers();
	}

	private getMembers(): void {
		const payload: any = {
			page: 1,
			page_size: 100,
			search: "",
			ordering: "-created_on",
			role_id: 1
		};
		this.ds.get(this.ds.formUrlParam(ApiRoutes.memberList, payload)).subscribe({
			next: (res: any) => {
				this.memberList = res.results;
				if (!!this.route.snapshot.params && this.route.snapshot.params['id']) {
					this.id = this.route.snapshot.params['id'];
					this.getWorkShop();
				}
			},
			error: (err) => console.error(err),
			complete: () => { }
		});
	}

	get formData() {
		return this.form.controls;
	}

	private intiForm(): void {
		this.form = new FormGroup({
			title: new FormControl("", [Validators.required]),
			tagline: new FormControl("", [Validators.required]),
			description: new FormControl('', [Validators.required]),
			privacy: new FormControl('', [Validators.required]),
			order: new FormControl(1),
		}, { 'updateOn': 'change' });
	}

	private getWorkShop(): void {
		this.ds.get(ApiRoutes.workshops + `${this.id}/`).subscribe({
			next: (res: any) => {
				if (res.id) {
					this.workshopDetail = res;
					// debugger
					if (res.privacy == 'Private') {
						this.form.addControl("price", new FormControl("", [Validators.required]));
						this.patchForm(['title', 'tagline', 'description', 'privacy', 'price']);
					} else {
						this.patchForm(['title', 'tagline', 'description', 'privacy']);
					}
				}
			},
			error: (err: any) => console.log(err),
			complete: () => { }
		})
	}

	private patchForm(controls: string[]): void {
		for (let i = 0; i < controls.length; i++) {
			this.form.get(controls[i])?.patchValue(this.workshopDetail[controls[i]]);
		}
	}

	onPrivacyChange(): void {
		if (this.form.get("privacy")?.value == 'Private') {
			this.form.addControl("price", new FormControl("", [Validators.required]));
		} else {
			this.form.removeControl("price");
		}
	}

	next(): void {
		if (this.form.invalid) {
			this.isSubmitting = true;
			return;
		}
		this.isSubmitting = false;
		if (this.view === 1) {
			this.form.addControl("instructor", new FormControl("", [Validators.required]));
			if (this.id) {
				this.patchForm(['instructor']);
			}
			this.view = 2;
		} else if (this.view === 2) {
			this.spinner.show();
			let request: any;
			if (this.id) {
				request = this.ds.put(ApiRoutes.workshops + `${this.id}/`, this.form.value);
			} else {
				request = this.ds.post(ApiRoutes.workshops, this.form.value);
			}
			request.subscribe({
				next: (res: any) => {
					if (!!res) {
						if (this.id) {
							this.toastr.success("Workspace updated successfully!", "Success");
						} else {
							this.toastr.success("Workspace created successfully!", "Success");
						}
						this.router.navigate([APP_ROUTES.workshops]);
					}
					this.spinner.hide();
				},
				error: () => this.spinner.hide(),
				complete: () => { }
			});
		}
	}
}