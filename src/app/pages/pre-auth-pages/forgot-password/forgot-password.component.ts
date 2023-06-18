import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

import { DataService } from '../../../shared/services/data.service';
import { APP_ROUTES } from '../../../shared/routes/app-routes';
import { ApiRoutes } from '../../../shared/routes/api.routes';
import { confirmPassword } from "../../../shared/validators";

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	isSubmitting1: boolean = false;
	isSubmitting2: boolean = false;
	form1!: FormGroup;
	form2!: FormGroup;
	screen: number = 1;
	passwordType: string = "password";
	cPasswordType: string = "password";
	routes: any = APP_ROUTES;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
	PhoneNumberFormat = PhoneNumberFormat;
	mobInvalid: string = "form-control";
	subs: Subscription = new Subscription();
	defaultCountry: any;
	defaultLogin: number = 2;	// 1: email, 2: mobile

	constructor(private fb: FormBuilder, private ds: DataService, private readonly spinner: NgxSpinnerService) { }

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

	get formData1() {
		return this.form1.controls;
	}

	get formData2() {
		return this.form2.controls;
	}

	private intiForm(): void {
		this.form1 = new FormGroup({
			username: new FormControl('', [Validators.required]),
		}, { 'updateOn': 'change' });
		if (this.defaultLogin == 2) {
			this.validatePhn();
		}
	}

	private validatePhn(): void {
		const validatePhoneNumber: any = this.form1.get('username')?.valueChanges.subscribe(data => {
			const errObj = this.form1.get('username')?.getError("validatePhoneNumber");
			if (!!errObj && !errObj?.valid) {
				this.mobInvalid = "form-control invalid";
			} else {
				this.mobInvalid = "form-control";
			}
		});
		this.subs.add(validatePhoneNumber);
	}

	onChangeLoginMethod(flag: number): void {
		this.form1.get("username")?.setValue("");
		if (flag == 1) {
			this.form1.get("username")?.setValidators([Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]);
		} else {
			this.form1.get("username")?.setValidators([Validators.required]);
		}
		this.form1.updateValueAndValidity();
		this.defaultLogin = flag;
	}

	initiateForgotPassword(): void {
		console.log(this.form1);
		if (this.form1.invalid) {
			this.isSubmitting1 = true;
			return;
		}
		this.isSubmitting1 = false;
		this.spinner.show();
		console.log(this.form1.value);
		let payload: any;
		if (this.defaultLogin == 1) {
			payload = this.form1.value;
		} else {
			payload = {
				username: this.form1.get("username")?.value?.e164Number
			};
		}
		this.ds.post(ApiRoutes.forgotPasswordInitiate, payload).subscribe(res => {
			console.log(res);
			this.spinner.hide();
			// this.initiateResetPassword();
		}, err => this.spinner.hide());
	}

	private initiateResetPassword(): void {
		this.screen = 2;
		this.form2 = this.fb.group({
			uuid: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required]),
			cpassword: new FormControl('', [Validators.required])
		}, {validator: confirmPassword('password', 'cpassword')});
	}

	resetPassword(): void {
		if (this.form2.invalid) {
			this.isSubmitting2 = true;
			return;
		}
		console.log(this.form2)
		this.isSubmitting2 = false;
		const payload: any = {
			uuid: this.form2.get("uuid")?.value,
			password: this.form2.get("password")?.value,
		};
		console.log(payload);
	}
}