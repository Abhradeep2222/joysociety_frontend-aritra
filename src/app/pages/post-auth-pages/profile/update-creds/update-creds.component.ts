import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { confirmPassword } from '../../../../shared/validators';
import { DataService } from '../../../../shared/services/data.service';
import { ToastService } from '../../../../shared/services/toastr.service';

@Component({
	selector: 'app-update-creds',
	templateUrl: './update-creds.component.html',
	styleUrls: ['./update-creds.component.scss']
})
export class UpdateCredsComponent implements OnInit {
	isEdit: boolean = false;
	isSubmitting: boolean = false;
	form!: FormGroup;
	creds: any;

	constructor(private ds: DataService, private readonly formBuilder: FormBuilder, private readonly ts: ToastService) { }

	ngOnInit(): void {
		this.intiForm();
		this.getCreds();
	}

	get formData() {
		return this.form.controls;
	}

	private intiForm(): void {
		this.form = this.formBuilder.group({
			email: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
			current_password: new FormControl('', [Validators.required]),
			new_password: new FormControl("", [Validators.required]),
			confirm_password: new FormControl("", []),
		}, { validator: confirmPassword('new_password', 'confirm_password') });
	}

	private getCreds(): void {
		this.ds.get(ApiRoutes.creds).subscribe({
			next: (res) => {
				this.creds = res;
				this.patchForm();
			},
			error: (err) => console.error(err),
			complete: () => { }
		});
	}

	toggleMode(flag: boolean): void {
		this.isEdit = flag;
		if (this.isEdit) {
			this.form.enable();
		} else {
			this.form.disable();
			this.patchForm();
		}
		this.form.get("current_password")?.setValue("");
		this.form.get("new_password")?.setValue("");
		this.form.get("confirm_password")?.setValue("");
	}

	private patchForm(): void {
		this.form.patchValue(this.creds);
		this.form.disable();
	}

	save(): void {
		if (this.form.invalid) {
			this.isSubmitting = true;
			return;
		}
		this.isSubmitting = false;
		this.ds.patch(ApiRoutes.creds, this.payload).subscribe({
			next: (res) => {
				console.log(res);
				this.creds = res;
				this.form.get("current_password")?.setValue("");
				this.form.get("new_password")?.setValue("");
				this.form.get("confirm_password")?.setValue("");
				this.isEdit = false;
				this.form.disable();
			},
			error: (err) => console.error(err),
			complete: () => this.ts.success("Credentials updated", "Success")
		});
	}

	get payload(): any {
		return {
			current_password: this.form.get("current_password")?.value,
			new_password: this.form.get("new_password")?.value,
			email: this.form.get("email")?.value
		}
	}
}