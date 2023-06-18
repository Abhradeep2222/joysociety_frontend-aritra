import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../../../../shared/services/data.service';
import { ToastService } from "../../../../shared/services/toastr.service";
import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { countryConfig, stateConfig, cityConfig } from "../profile.config";

@Component({
	selector: 'app-billing',
	templateUrl: './billing.component.html',
	styleUrls: ['./billing.component.scss']
})

export class BillingComponent implements OnInit {
	countryConfig = countryConfig;
	stateConfig = stateConfig;
	cityConfig = cityConfig;
	active: string = 'billing';
	isEdit: boolean = false;
	isSubmitting1: boolean = false;
	isSubmitting2: boolean = false;
	billingForm!: FormGroup;
	ccForm!: FormGroup;
	billingInfo: any;

	constructor(private readonly ds: DataService, private readonly ts: ToastService) { }

	ngOnInit(): void {
		this.initForm();
	}

	get billingFormData() {
		return this.billingForm.controls;
	}

	get ccFormData() {
		return this.ccForm.controls;
	}

	openTab(tab: string): void {
		this.active = tab;
		this.isEdit = false;
		this.patchForm();
		this.isSubmitting1 = false;
		this.isSubmitting2 = false;
		this.billingForm.disable();
		this.ccForm.disable();
	}

	private initForm(): void {
		this.billingForm = new FormGroup({
			address_line_1: new FormControl('', [Validators.required]),
			address_line_2: new FormControl('', []),
			country: new FormControl('', [Validators.required]),
			state: new FormControl('', [Validators.required]),
			city: new FormControl('', [Validators.required]),
			postal_code: new FormControl('', [Validators.required]),
		}, { 'updateOn': 'change' });

		this.ccForm = new FormGroup({
			name: new FormControl('', [Validators.required]),
			card_number: new FormControl('', [Validators.required]),
			cvc: new FormControl('', [Validators.required]),
			exp_date: new FormControl('', [Validators.required])
		}, { 'updateOn': 'change' });
		this.billingForm.disable();
		this.ccForm.disable();
		this.getInitialInfo();
	}

	toggleMode(flag: boolean): void {
		this.isEdit = flag;
		if (this.isEdit) {
			if (this.active == 'billing') {
				this.billingForm.enable();
			} else {
				this.ccForm.enable();
			}
		} else {
			if (this.active == 'billing') {
				this.billingForm.disable();
			} else {
				this.ccForm.disable();
			}
		}
		this.patchForm();
	}

	emitter(e: any): void {
		if (e.data) {
			this.billingForm.get(e.control)?.setValue(e.data.id);
		} else {
			this.billingForm.get(e.control)?.setValue("");
		}
	}

	private patchForm(): void {
		if (this.active == 'billing') {
			this.billingForm.get("address_line_1")?.setValue(this.billingInfo.address_line_1);
			this.billingForm.get("address_line_2")?.setValue(this.billingInfo.address_line_2);
			this.billingForm.get("country")?.setValue(this.billingInfo.country.name);
			this.billingForm.get("state")?.setValue(this.billingInfo.state.name);
			this.billingForm.get("city")?.setValue(this.billingInfo.city.name);
			this.billingForm.get("postal_code")?.setValue(this.billingInfo.postal_code);
		} else {
			this.ccForm.get("name")?.setValue("");
			this.ccForm.get("card_number")?.setValue("");
			this.ccForm.get("cvc")?.setValue("");
			this.ccForm.get("exp_date")?.setValue("");
		}
	}

	private getInitialInfo(): void {
		const urls: string[] = [ApiRoutes.billingAddress];
		this.ds.forkJoin(urls).subscribe((res: any[]) => {
			if (res.length) {
				this.billingInfo = res[0];
				this.countryConfig.defalutValue = this.billingInfo.country;
				this.stateConfig.defalutValue = this.billingInfo.state;
				this.cityConfig.defalutValue = this.billingInfo.city;
			}
		});
	}

	save(): void {
		if (this.active == 'billing') {
			this.saveBillingAddress();
		} else {
			this.saveCCInfo();
		}
	}

	private saveBillingAddress(): void {
		if (this.billingForm.invalid) {
			this.isSubmitting1 = true;
			return;
		}
		this.isSubmitting1 = false;
		this.ds.post(ApiRoutes.billingAddress, this.billingForm.value).subscribe({
			next: (res) => {
				this.billingInfo = res;
				this.isEdit = false;
				this.billingForm.disable();
				this.ts.success("Billing Address updated", "Success");
			},
			error: (err) => console.error(err),
			complete: () => {}
		});
	}

	private saveCCInfo(): void {
		if (this.ccForm.invalid) {
			this.isSubmitting2 = true;
			return;
		}
		this.isSubmitting2 = false;
	}
}