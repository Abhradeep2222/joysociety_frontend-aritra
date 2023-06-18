import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { ToastService } from '../../../../shared/services/toastr.service';
import { DataService } from '../../../../shared/services/data.service';
import { locationConfig, timezoneConfig } from "../profile.config";
import { LocalStorage } from 'src/app/shared/services/storage.service';

@Component({
	selector: 'app-profile-edit',
	templateUrl: './profile-edit.component.html',
	styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
	isEdit: boolean = false;
	isSubmitting: boolean = false;
	form!: FormGroup;
	locationConfig = locationConfig;
	timezoneConfig = timezoneConfig;
	profileDetail!: any;
	profileDetailDump!: any;

	constructor(public readonly ds: DataService, private fb: FormBuilder, private readonly ts: ToastService, private readonly ls: LocalStorage) { }

	ngOnInit(): void {
		this.intiForm();
		this.getProfileInfo();
	}

	get formData() {
		return this.form.controls;
	}

	private getProfileInfo(): void {
		this.profileDetail = this.ds.state.get('profileData');
		this.profileDetailDump = this.ds.state.get('profileData');
		this.locationConfig.defalutValue = this.profileDetail.location;
		this.timezoneConfig.defalutValue = this.profileDetail.timezone;
		this.patchForm();
	}

	private intiForm(): void {
		this.form = new FormGroup({
			first_name: new FormControl("", [Validators.required]),
			last_name: new FormControl("", [Validators.required]),
			mini_bio: new FormControl('', [Validators.required]),
			about: new FormControl(''),
			profile_pic: new FormControl(''),
			personal_links: this.fb.array([this.initLinksForm()]),
			location: new FormControl('', [Validators.required]),
			timezone: new FormControl(''),
		}, { 'updateOn': 'change' });
	}

	initLinksForm(): FormGroup {
		return this.fb.group({
			link: new FormControl('', [Validators.required])
		});
	}

	get personalLinks(): FormArray {
		return this.form.get("personal_links") as FormArray
	}

	addLinkFields() {
		if (this.isInValidLinkControl(this.personalLinks)) {
			return
		}
		this.personalLinks.push(this.initLinksForm());
	}

	private isInValidLinkControl(control: FormArray): boolean {
		let error: boolean = false;
		for (let i = 0; i < control.length; i++) {
			if (control.at(i).get("link")?.invalid) {
				error = true;
				break;
			}
		}
		if (error) {
			this.isSubmitting = true;
		} else {
			this.isSubmitting = false;
		}
		return this.isSubmitting
	}

	removeLinkFields(index: number): void {
		this.personalLinks.removeAt(index);
	}

	onFileChanged(event: any): void {
		if (event.target.files && event.target.files[0]) {
			const formdata: any = new FormData();
			formdata.append("file", event.target.files[0]);
			formdata.append("category", "Profile");
			this.ds.post(ApiRoutes.upload, formdata).subscribe(res => {
				if (res.fle) {
					this.form.get('profile_pic')?.setValue(res.fle);
					this.form.markAsDirty();
					const profileDetail: any = { ...this.profileDetail };
					profileDetail.profile_pic = this.form.get('profile_pic')?.value;
					this.updateState("profileData", profileDetail);
				}
			});
		}
	}

	private patchForm(): void {
		this.form.get("profile_pic")?.setValue(this.profileDetail.profile_pic);
		this.form.get("first_name")?.setValue(this.profileDetail.full_name.split(' ').slice(0, -1).join(' '));
		this.form.get("last_name")?.setValue(this.profileDetail.full_name.split(' ').slice(-1).join(' '));
		this.form.get("mini_bio")?.setValue(this.profileDetail.mini_bio);
		this.form.get("about")?.setValue(this.profileDetail.about);
		const length: number = this.profileDetail.personal_links.length;
		if (length > 0) {
			const control = this.personalLinks;
			control.at(0).get("link")?.setValue(this.profileDetail.personal_links[0]);
			if (length > 1) {
				for (var i = 1; i < length; i++) {
					control.push(this.initLinksForm());
					control.at(i).get("link")?.setValue(this.profileDetail.personal_links[i]);
				}
			}
		}
		this.form.disable();
		this.updateState("profileData", this.profileDetail);
	}

	toggleMode(flag: boolean): void {
		this.isEdit = flag;
		if (this.isEdit) {
			this.form.enable();
		} else {
			this.form.disable();
			const length: number = this.personalLinks.length
			for (var i = 0; i < length; i++) {
				this.removeLinkFields(0);
			}
			this.personalLinks.push(this.initLinksForm());
			this.profileDetail.profile_pic = this.profileDetailDump.profile_pic;
			this.patchForm();
		}
	}

	emitter(e: any): void {
		if (e.data) {
			this.form.get(e.control)?.setValue(e.data.id);
		} else {
			this.form.get(e.control)?.setValue("");
		}
	}

	save(): void {
		if (this.form.invalid) {
			this.isSubmitting = true;
			return;
		}
		this.isSubmitting = false;
		this.ds.post(ApiRoutes.profile, this.payload).subscribe({
			next: (res) => {
				this.updateState("profileData", res);
				this.ds.broadCastState(true);
				this.isEdit = false;
				this.form.disable();
			},
			error: (err) => console.error(err),
			complete: () => this.ts.success("Profile Updated", "Success")
		});
	}

	updateState(key: string, data: any): void {
		this.ds.state.delete(key);
		this.ds.state.set(key, data);
		this.ls.setItem('joy-state', JSON.stringify(Array.from(this.ds.state.entries())));
		this.profileDetail = this.ds.state.get(key);
		// this.profileDetailDump = this.ds.state.get(key);
	}

	get payload(): any {
		return {
			full_name: this.form.get("first_name")?.value + ' ' + this.form.get("last_name")?.value,
			profile_pic: this.form.get("profile_pic")?.value,
			mini_bio: this.form.get("mini_bio")?.value,
			personal_links: this.form.get('personal_links')?.value.map((i: any) => { return i.link }),
			location: this.form.get("location")?.value,
			timezone: this.form.get("timezone")?.value
		}
	}
}