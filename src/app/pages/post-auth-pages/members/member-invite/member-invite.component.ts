import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastService } from '../../../../shared/services/toastr.service';
import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from "../../../../shared/services/data.service";

@Component({
	selector: 'app-member-invite',
	templateUrl: './member-invite.component.html',
	styleUrls: ['./member-invite.component.scss']
})

export class MemberInviteComponent implements OnInit {
	@Input() config?: any;
	isSubmitting: boolean = false;
	form!: FormGroup;
	roles: any[] = [];
	inviteContent!: any;
	emailValidate = [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)];

	constructor(private readonly ds: DataService, private readonly ts: ToastService) { }

	ngOnInit(): void {
		this.intiForm();
		this.getRequiredInfo();
	}

	get formData() {
		return this.form.controls;
	}

	private intiForm(): void {
		this.form = new FormGroup({
			template: new FormControl("", [Validators.required]),
			invite_link: new FormControl("", [Validators.required]),
			role: new FormControl('', [Validators.required]),
			emails: new FormControl([], [Validators.required])
		}, { 'updateOn': 'change' });
	}

	private getRequiredInfo(): void {
		const urls: string[] = [ApiRoutes.roles, ApiRoutes.inviteContent];
		this.ds.forkJoin(urls).subscribe({
			next: (res) => {
				if (res.length) {
					this.roles = res[0];
					this.inviteContent = res[1];
					this.form.get("invite_link")?.setValue(this.inviteContent.invite_link);
					this.form.get("template")?.setValue(this.inviteContent.template);
				}
			},
			error: (err) => console.error(err),
			complete: () => { }
		});
	}

	Send(): void {
		if (this.form.invalid) {
			this.isSubmitting = true;
			return;
		}
		this.isSubmitting = false;
		const contentPayload: any = {
			template: this.form.get("template")?.value,
			// invite_link: this.form.get("invite_link")?.value,
		};
		this.ds.put(ApiRoutes.inviteContent, contentPayload).subscribe({
			next: (res) => {
				console.log(res);
				if (!!res) {
					const invitePayload: any = {
						emails: this.form.get("emails")?.value,
						role: +this.form.get("role")?.value,
					};
					this.ds.post(ApiRoutes.memberInvite, invitePayload).subscribe({
						next: (data) => {
							console.log(data)
							if (!!data) {
								this.form.get("emails")?.setValue("");
								this.form.get("rolet")?.setValue("");
								this.ts.success("Invite Sent!", "Success");
							}
						},
						error: (err) => console.error(err),
						complete: () => { }
					});
				}
			},
			error: (err) => console.error(err),
			complete: () => { }
		});
	}

	cancel(): void {
		this.form.get("emails")?.setValue("");
		this.form.get("rolet")?.setValue("");
		this.form.get("invite_link")?.setValue(this.inviteContent.invite_link);
		this.form.get("template")?.setValue(this.inviteContent.template);
	}

	copyLink(): void {
		this.ts.success("Link Copied!");
	}
}
