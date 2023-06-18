import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { APP_ROUTES } from '../../../shared/routes/app-routes';
import { AuthService } from '../../../shared/services/auth.service';
import { ApiRoutes } from '../../../shared/routes/api.routes';
import { DataService } from '../../../shared/services/data.service';
import { InfoPopupComponent } from "../../../shared/components/popups/info-popup/info-popup.component";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
	isSubmitting: boolean = false;
	form!: FormGroup;
	passwordType: string = "password";
	routes: any = APP_ROUTES;
	defaultLogin: number = 2;	// 1: email, 2: mobile
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
	PhoneNumberFormat = PhoneNumberFormat;
	mobInvalid: string = "form-control";
	subs: Subscription = new Subscription();
	defaultCountry: any;

	constructor(private readonly ms: NgbModal, private auth: AuthService, private readonly ds: DataService, private readonly router: Router, private readonly spinner: NgxSpinnerService) { }

	ngOnInit(): void {
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
		this.form = new FormGroup({
			username: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required]),
		}, { 'updateOn': 'change' });
		if (this.defaultLogin == 2) {
			this.validatePhn();
		}
	}

	private validatePhn(): void {
		const validatePhoneNumber: any = this.form.get('username')?.valueChanges.subscribe(data => {
			const errObj = this.form.get('username')?.getError("validatePhoneNumber");
			if (!!errObj && !errObj?.valid) {
				this.mobInvalid = "form-control invalid";
			} else {
				this.mobInvalid = "form-control";
			}
		});
		this.subs.add(validatePhoneNumber);
	}

	onChangeLoginMethod(flag: number): void {
		this.form.get("username")?.setValue("");
		if (flag == 1) {
			this.form.get("username")?.setValidators([Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]);
		} else {
			this.form.get("username")?.setValidators([Validators.required]);
		}
		this.form.updateValueAndValidity();
		this.defaultLogin = flag;
	}

	submit(): void {
		console.log(this.form.invalid);
		if (this.form.invalid) {
			this.isSubmitting = true;
			return;
		}
		this.isSubmitting = false;
		this.spinner.show();
		let payload: any;
		if (this.defaultLogin == 1) {
			payload = this.form.value;
 		} else {
			payload = {
				username: this.form.get("username")?.value?.e164Number,
				password: this.form.get("password")?.value
			};
		}
		this.auth.login(ApiRoutes.login, payload).subscribe(res => {
			if (res.token) {
				const urls: string[] = [ApiRoutes.ipConfig, ApiRoutes.profile];
				this.ds.loadState(urls).then((res: boolean) => {
					if (res) {
						this.router.navigate([APP_ROUTES.dashboard]).then(() => {
							const profileData: any = this.ds.state.get('profileData');
							if (profileData.role != 1) {
								this.navigateTo();
							}
						});
					}	
					this.spinner.hide();
				});
			}
		}, err => this.spinner.hide());
	}

	private navigateTo(): void {
		const ngbModalOptions: NgbModalOptions = {
			backdrop: 'static',
			keyboard: false,
			size: 'md',
			centered: true
		};
		const modalRef: NgbModalRef = this.ms.open(InfoPopupComponent, ngbModalOptions);
		modalRef.componentInstance.data = {
			bodyImg: "assets/img/subscription.png",
			imgAlt: "buy subscription",
			imgContainerClass: "text-center",
			info: `<div class='text-center mt-3'>
				<h5 class='mb-0 text-main-green'>One Step Closer</h5>
				<p class='mb-0 f-x-small'>to Access all Features of</p>
				<p class='f-x-small'><b>Joy Society</b></p>
			</div>`,
			btnContainerClass: "mb-4 w-50 d-grid m-auto",
			okBtn: "BUY SUBSCRIPTION NOW",
			okBtnClass: "btn-success fw-bold f-x-small",
			cancelBtn: "",
			cancelBtnClass: "btn-success fw-bold f-x-small",
		};
		modalRef.closed.subscribe((data: any) => {
			if (data) {
				// navigate to subscription page once ready
				this.router.navigate([APP_ROUTES.subscriptions]);
				return;
			}
			this.router.navigate([APP_ROUTES.dashboard]);
		});
	}
}