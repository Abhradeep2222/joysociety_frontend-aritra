import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';
import { APP_ROUTES } from '../../../../shared/routes/app-routes';
import { ToastService } from '../../../../shared/services/toastr.service';

@Component({
	selector: 'app-tribe-form',
	templateUrl: './tribe-form.component.html',
	styleUrls: ['./tribe-form.component.scss']
})
export class TribeFormComponent implements OnInit {
	isSubmitting: boolean = false;
	form!: FormGroup;
	id!: string;
	tribeDetail!: any;
	imageChangedEvent!: any;
	croppedFile: any = null;
	croppedImage!: any;
	showCropper: boolean = false;
	privacy: string[] = ["Public", "Private", "Secret"];

	constructor(private ds: DataService, private readonly spinner: NgxSpinnerService, private readonly router: Router, private readonly route: ActivatedRoute, private readonly toastr: ToastService) { }

	ngOnInit(): void {
		this.intiForm();
		if (!!this.route.snapshot.params && this.route.snapshot.params['id']) {
			this.id = this.route.snapshot.params['id'];
			this.getTribeDetail();
		}
	}

	get formData() {
		return this.form.controls;
	}

	private intiForm(): void {
		this.form = new FormGroup({
			tribe_url: new FormControl('', [Validators.required]),
			title: new FormControl("", [Validators.required]),
			tagline: new FormControl("", [Validators.required]),
			description: new FormControl("", [Validators.required]),
			privacy: new FormControl("", [Validators.required]),
		}, { 'updateOn': 'change' });
	}

	getTribeDetail(): void {
		this.ds.get(ApiRoutes.tribe + `${this.id}/`).subscribe({
			next: (res: any) => {
				if (!!res) {
					this.tribeDetail = res;
					this.form.patchValue(res);
					if (this.tribeDetail.tribe_url) {
						this.form.get('tribe_url')?.setValue(this.tribeDetail.tribe_url);
						this.croppedImage = this.tribeDetail.tribe_url;
					}
				}
			},
			error: (err: any) => console.log(err),
			complete: () => {}
		});
	}

	onFileChanged(event: any): void {
		if (event.target.files && event.target.files[0]) {
			const _URL = window.URL || window.webkitURL;
			const img = new Image();
			const objectUrl: any = _URL.createObjectURL(event.target.files[0]);
			img.src = objectUrl;
			img.onload = () => {
				if (img.width >= 600 && img.height >= 450) {
					this.imageChangedEvent = event;
					this.form.get("tribe_url")?.setErrors(null);
				} else {
					this.form.get("tribe_url")?.setErrors({ dimensionErr: true });
				}
				_URL.revokeObjectURL(objectUrl);
			};
		}
	}

	imageCropped(event: any): void {
		this.croppedImage = event.base64;
		const fileName: string = this.imageChangedEvent.target.files[0].name;
		this.dataUrlToFile(this.croppedImage, fileName).then((file: File) => {
			if (file) {
				this.croppedFile = file;
			}
		});
	}

	async dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
		const res: Response = await fetch(dataUrl);
		const blob: Blob = await res.blob();
		return new File([blob], fileName, { type: 'image/png' });
	}

	imageLoaded(): void {
		this.showCropper = true;
	}

	cropperReady(sourceImageDimensions: any): void {
		console.log(sourceImageDimensions);
	}

	upload(): void {
		const formdata: any = new FormData();
		formdata.append("file", this.croppedFile);
		formdata.append("category", "Tribe");
		this.ds.post(ApiRoutes.upload, formdata).subscribe(res => {
			if (res.fle) {
				this.form.get('tribe_url')?.setValue(res.fle);
				this.croppedFile = null;
				this.showCropper = false;
				this.form.markAsDirty();
			}
		});
	}

	clearUpload(): void {
		this.showCropper = false;
		this.croppedFile = null;
		this.croppedImage = null;
		this.imageChangedEvent = null;
		this.form.get('tribe_url')?.setValue("");
	}

	submit(): void {
		if (this.form.invalid) {
			this.isSubmitting = true;
			return;
		}
		this.isSubmitting = false;
		this.spinner.show();
		let request: any;
		if (this.id) {
			request = this.ds.put(ApiRoutes.tribe + `${this.id}/`, this.form.value);
			
		} else {
			request = this.ds.post(ApiRoutes.tribe, this.form.value);
		}
		request.subscribe({
			next: (res: any) => {
				if (!!res) {
					this.toastr.success(this.id ? "Tribe updated successfully!" : "Tribe created successfully!", "Success");
					this.router.navigate([APP_ROUTES.tribes]);
				}
				this.spinner.hide();
			},
			error: (err: any) => {
				console.log(err)
				this.spinner.hide();
			},
			complete: () => {}
		});
	}
}
