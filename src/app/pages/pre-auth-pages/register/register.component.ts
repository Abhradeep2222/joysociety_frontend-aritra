import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
// import { HttpClient } from '@angular/common/http';

import { DataService } from '../../../shared/services/data.service';
import { APP_ROUTES } from '../../../shared/routes/app-routes';
import { confirmPassword } from "../../../shared/validators";
import { ApiRoutes } from '../../../shared/routes/api.routes';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
	isSubmitting: boolean = false;
	form!: FormGroup;
	passwordType: string = "password";
	cPasswordType: string = "password";
	routes: any = APP_ROUTES;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
	PhoneNumberFormat = PhoneNumberFormat;
	mobInvalid: string = "form-control";
	subs: Subscription = new Subscription();
	defaultCountry: any;
	view: number = 1;
	imageChangedEvent!: any;
	croppedImage!: any;
	croppedFile!: any;
	showCropper: boolean = false;
	referId!: string;

	constructor(private readonly route: ActivatedRoute, private readonly formBuilder: FormBuilder, private ds: DataService, private readonly auth: AuthService, private readonly router: Router, private readonly spinner: NgxSpinnerService) { }

	ngOnInit(): void {
		console.log(this.route.snapshot.queryParams);
		if (!!this.route.snapshot.queryParams && this.route.snapshot.queryParams['id']) {
			this.referId = this.route.snapshot.queryParams['id'];
		}
		const CountryISO: any = this.CountryISO;
		for (let k in CountryISO) {
			const ipConfig: any = this.ds.state.get("ipConfig");
			if (CountryISO[k] == ipConfig.country_code.toLocaleLowerCase()) {
				this.defaultCountry = CountryISO[k];
				break;
			} else {
				this.defaultCountry = CountryISO.UnitedStates;
			}
		}
		this.intiForm();
	}
    
	
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

	get formData() {
		return this.form.controls;
	}

	private intiForm(): void {
		this.form = this.formBuilder.group({
			first_name: new FormControl('', [Validators.required]),
			last_name: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
			phone_number: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required]),
			cpassword: new FormControl('', [Validators.required]),
			tnc: new FormControl(false, [Validators.requiredTrue]),
			profile_pic: new FormControl(""),
		}, { validator: confirmPassword('password', 'cpassword') });

		const validatePhoneNumber: any = this.form.get('phone_number')?.valueChanges.subscribe(data => {
			const errObj = this.form.get('phone_number')?.getError("validatePhoneNumber");
			if (!!errObj && !errObj?.valid) {
				this.mobInvalid = "form-control invalid";
			} else {
				this.mobInvalid = "form-control";
			}
		});
		this.subs.add(validatePhoneNumber);
	}

	onFileChanged(event: any): void {
		if (event.target.files && event.target.files[0]) {
			this.imageChangedEvent = event;
		}
	}

	uploadPic(): void {
		const formdata: any = new FormData();
		formdata.append("file", this.croppedFile);
		formdata.append("category", "Profile");
		this.ds.post(ApiRoutes.upload, formdata).subscribe(res => {
			if (res.fle) {
				this.form.get('profile_pic')?.setValue(res.fle);
				console.log(this.form.get('profile_pic')?.value);
				this.croppedFile = null;
				this.showCropper = false;
				this.form.markAsDirty();
			}
		});
	}

	imageCropped(event: any): void {
		this.croppedImage = event.base64;
		const fileName: string = this.imageChangedEvent.target.files[0].name;
		this.dataUrlToFile(this.croppedImage, fileName).then((file: File) => {
			if (file ) {
				this.croppedFile = file;
			}
		});
	}

	imageLoaded(): void {
		this.showCropper = true;
	}

	cropperReady(sourceImageDimensions: any): void {
		console.log('Cropper ready', sourceImageDimensions);
	}

	loadImageFailed(): void {
		console.log('Load failed');
	}

	async dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
		const res: Response = await fetch(dataUrl);
		const blob: Blob = await res.blob();
		return new File([blob], fileName, { type: 'image/png' });
	}

	submit(): void {
		if (this.form.invalid) {
			this.isSubmitting = true;
			return;
		}
		this.isSubmitting = false;
		if (this.view === 1) {
			this.view = 2;
		} else if (this.view === 2) {
			// this.form.addControl("membership_completion", new FormControl("", [Validators.required]));
			// this.form.addControl("purchase_email", new FormControl("", [Validators.required]));
			// this.form.addControl("invite_group_or_partner", new FormControl("", [Validators.required]));
			// this.view = 3;
		// } else {
			this.spinner.show();
			const payload: any = {
				full_name: this.form.get("first_name")?.value + " " + this.form.get("last_name")?.value,
				email: this.form.get("email")?.value,
				phone_number: this.form.get("phone_number")?.value?.number,
				country_code: this.form.get("phone_number")?.value?.dialCode,
				password: this.form.get("password")?.value,
				tnc: this.form.get("tnc")?.value,
				profile_pic: this.form.get('profile_pic')?.value,
				membership_completion: "test", //this.form.get('membership_completion')?.value,
				purchase_email: "test2", //this.form.get('purchase_email')?.value,
				invite_group_or_partner:"test3", //this.form.get('invite_group_or_partner')?.value,
				refer: this.referId ? this.referId : ''
			};
			console.log(payload)
			this.auth.login(ApiRoutes.register, payload).subscribe(res => {
				if (res.token) {
					const urls: string[] = [ApiRoutes.ipConfig, ApiRoutes.profile];
					this.ds.loadState(urls).then((res: boolean) => {
						if (res) {
							this.router.navigate([APP_ROUTES.dashboard]);
						}
						this.spinner.hide();
					});
				}
			}, err => this.spinner.hide());
		}
	}
}