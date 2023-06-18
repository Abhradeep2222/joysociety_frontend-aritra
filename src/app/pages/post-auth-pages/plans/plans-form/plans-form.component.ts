import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';
import { APP_ROUTES } from '../../../../shared/routes/app-routes';
import { ToastService } from '../../../../shared/services/toastr.service';

@Component({
	selector: 'app-plans-form',
	templateUrl: './plans-form.component.html',
	styleUrls: ['./plans-form.component.scss']
})
export class PlansFormComponent implements OnInit {
	isSubmitting: boolean = false;
	isSubmitting2: boolean = false;
	form!: FormGroup;
	form2!: FormGroup;
	id!: string;
	planDetails!: any;
	imageChangedEvent!: any;
	croppedFile: any = null;
	croppedImage!: any;
	showCropper: boolean = false;
	view: number = 1;
	totalSteps: any[] = [
		{ step: 1, status: "completed", description: "Plan Details" },
		{ step: 2, status: "", description: "Configure" },
		{ step: 3, status: "", description: "Finish" },
	];

	constructor(private fb: FormBuilder, private ds: DataService, private readonly spinner: NgxSpinnerService, private readonly router: Router, private readonly route: ActivatedRoute, private readonly toastr: ToastService) { }

	ngOnInit(): void {
		this.intiForm();
		if (!!this.route.snapshot.params && this.route.snapshot.params['id']) {
			this.id = this.route.snapshot.params['id'];
			this.getPlanDetail();
		}
	}

	private getPlanDetail(): void {
		this.ds.get(`${ApiRoutes.plans + this.id}/detail/`).subscribe({
			next: (res: any) => {
				if (!!res && res.id) {
					this.planDetails = res;
					this.patchForm();
				}
			},
			error: (err: any) => console.log(err),
			complete: () => {}
		});
		
	}

	get formData() {
		return this.form.controls;
	}

	get formData2() {
		return this.form2.controls;
	}

	private intiForm(): void {
		this.form = new FormGroup({
			name: new FormControl("", [Validators.required]),
			internal_note: new FormControl("", []),
			image: new FormControl('', [Validators.required]),
			sales_pitch: new FormControl("", [Validators.required]),
			benefits: this.fb.array([this.initBenefitForm()]),
			description: new FormControl("", [Validators.required]),
			is_active: new FormControl(false),
			is_draft: new FormControl(true),

		}, { 'updateOn': 'change' });

		this.form2 = new FormGroup({
			display_price: new FormControl("", [Validators.required]),
			discount: new FormControl("0", [Validators.required]),
			offer_price: new FormControl({ value: '', disabled: true }, [Validators.required]),
			payment_type: new FormControl("WEEKLY", [Validators.required]),
		}, { 'updateOn': 'change' });
	}

	patchForm(): void {
		this.form.get("name")?.setValue(this.planDetails.name);
		this.form.get("internal_note")?.setValue(this.planDetails.internal_note);
		this.form.get("image")?.setValue(this.planDetails.image);
		this.form.get("sales_pitch")?.setValue(this.planDetails.sales_pitch);
		this.form.get("description")?.setValue(this.planDetails.description);
		this.form.get("is_active")?.setValue(this.planDetails.is_active);
		this.form.get("is_draft")?.setValue(this.planDetails.is_draft);
		const benefits: string[] = this.planDetails.benefits.split(',');
		if (benefits.length > 0) {
			const control = this.benefits
			control.at(0).get("benefits")?.setValue(benefits[0]);
			if (benefits.length > 1) {
				for (var i = 1; i < benefits.length; i++) {
					control.push(this.initBenefitForm());
					control.at(i).get("benefits")?.setValue(benefits[i]);
				}
			}
		}
		this.form2.get("display_price")?.setValue(this.planDetails.display_price);
		this.form2.get("discount")?.setValue(this.planDetails.discount);
		this.calculateOfferPrice();
		this.form2.get("payment_type")?.setValue(this.planDetails.payment_type);
		if (this.planDetails.payment_type === 'CUSTOM') {
			this.form2.addControl("days", new FormControl(this.planDetails.days, [Validators.required]));
		}
		this.form2.get("")?.setValue(this.planDetails);
	}

	initBenefitForm(): FormGroup {
		return this.fb.group({
			benefits: new FormControl('', [Validators.required])
		});
	}

	get benefits(): FormArray {
		return this.form.get("benefits") as FormArray
	}

	addLinkFields() {
		// if (this.isInValidBenefitControl(this.benefits)) {
		// 	return
		// }
		this.benefits.push(this.initBenefitForm());
	}

	removeLinkFields(index: number): void {
		this.benefits.removeAt(index);
	}

	// private isInValidBenefitControl(control: FormArray): boolean {
	// 	let error: boolean = false;
	// 	for (let i = 0; i < control.length; i++) {
	// 		if (control.at(i).get("benefits")?.invalid) {
	// 			error = true;
	// 			break;
	// 		}
	// 	}
	// 	if (error) {
	// 		this.isSubmitting = true;
	// 	} else {
	// 		this.isSubmitting = false;
	// 	}
	// 	return this.isSubmitting
	// }

	onFileChanged(event: any): void {
		if (event.target.files && event.target.files[0]) {
			const _URL = window.URL || window.webkitURL;
			const img = new Image();
			const objectUrl: any = _URL.createObjectURL(event.target.files[0]);
			img.src = objectUrl;
			img.onload = () => {
				if (img.width >= 600 && img.height >= 450) {
					this.imageChangedEvent = event;
					this.form.get("image")?.setErrors(null);
				} else {
					this.form.get("image")?.setErrors({ dimensionErr: true });
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

	onPaymentTypeChange(): void {
		if (this.form2.get("payment_type")?.value === "CUSTOM") {
			this.form2.addControl("days", new FormControl("", [Validators.required]));
		} else {
			this.form2.removeControl("days");
		}
	}

	calculateOfferPrice(): void {
		if (this.form2.get("display_price")?.value && this.form2.get("discount")?.value) {
			const offerPrice: number = Number(this.form2.get("display_price")?.value) - (Number(this.form2.get("display_price")?.value) * (Number(this.form2.get("discount")?.value) / 100));
			this.form2.get("offer_price")?.setValue(offerPrice);
		}
	}

	crop(): void {
		const reader = new FileReader();
		reader.onloadend = () => {
			console.log(reader.result);
			if (reader.result) {
				this.form.get('image')?.setValue(reader.result);
			}
		};
		reader.readAsDataURL(this.croppedFile);
	}

	clearUpload(): void {
		this.showCropper = false;
		this.croppedFile = null;
		this.croppedImage = null;
		this.imageChangedEvent = null;
		this.form.get('image')?.setValue("");
	}

	next(screen: number): void {
		if (this.view == 1) {
			if (this.form.invalid) {
				this.isSubmitting = true;
				return;
			}
			this.isSubmitting = false;

		} else if (this.view == 2) {
			if (this.form2.invalid) {
				this.isSubmitting2 = true;
				return;
			}
			this.isSubmitting2 = false;
		}
		this.totalSteps.find(i => i.step == screen).status = "completed";
		this.view = screen;
	}

	submit(): void {
		if (this.form.invalid || this.form2.invalid) {
			this.isSubmitting = true;
			this.isSubmitting2 = true;
			return;
		}
		this.isSubmitting = false;
		this.isSubmitting2 = false;
		this.spinner.show();
		console.log(this.form.value);

		const benefits: string[] = [];
		for (let i = 0; i < this.form.get('benefits')?.value.length; i++) {
			const el = this.form.get('benefits')?.value[i];
			benefits.push(el.benefits)
		}
		const formData: any = new FormData();
		formData.append("name", this.form.get("name")?.value);
		formData.append("internal_note", this.form.get("internal_note")?.value);
		if (this.croppedFile) {
			formData.append("image", this.croppedFile);
		}
		formData.append("sales_pitch", this.form.get("sales_pitch")?.value);
		formData.append("benefits", benefits.join());
		formData.append("description", this.form.get("description")?.value);
		formData.append("is_active", this.form.get("is_active")?.value);
		formData.append("is_draft", this.form.get("is_draft")?.value);
		formData.append("display_price", this.form2.get("display_price")?.value);
		formData.append("discount", this.form2.get("discount")?.value);
		formData.append("offer_price", this.form2.get("offer_price")?.value);
		formData.append("payment_type", this.form2.get("payment_type")?.value);
		if (this.formData2['payment_type'].value == 'CUSTOM') {
			formData.append("days", this.form2.get("days")?.value);
		}

		let method: any;
		if (this.id) {
			method = this.ds.put(`${ApiRoutes.plans + this.id}/`, formData);
		} else {
			method = this.ds.post(ApiRoutes.plans, formData);
		}

		method.subscribe({
			next: (res: any) => {
				if (!!res && res.id) {
					if (this.id) {
						this.toastr.success("Plan updated successfully!", "Success");
					} else {
						this.toastr.success("Plan created successfully!", "Success");
					}
					this.router.navigate([APP_ROUTES.plans]);
				}
				this.spinner.hide();
			},
			error: (err: any) => {
				console.log(err)
				this.spinner.hide();
			},
			complete: () => { }
		})
	}

	cancel(): void {
		this.router.navigate([APP_ROUTES.plans]);
	}
}
