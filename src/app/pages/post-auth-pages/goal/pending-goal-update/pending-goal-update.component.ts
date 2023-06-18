import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastService } from '../../../../shared/services/toastr.service';
import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';
import { actionStepsAll } from "../goal.config";
import { APP_ROUTES } from '../../../../shared/routes/app-routes';
import { dateToObjDate, objToDateObj } from "../../../../shared/utilities";

@Component({
	selector: 'app-pending-goal-update',
	templateUrl: './pending-goal-update.component.html',
	styleUrls: ['./pending-goal-update.component.scss']
})
export class PendingGoalUpdateComponent implements OnInit {
	isSubmitting: boolean = false;
	goalForm!: FormGroup;
	sphereList: any[] = [];
	id!: string;
	actionSteps: any[] = actionStepsAll;
	selectedSphereActionStep: string[] = [];

	constructor(private readonly ds: DataService, private readonly spinner: NgxSpinnerService, private readonly router: Router, private readonly ts: ToastService, private readonly route: ActivatedRoute) { }

	ngOnInit(): void {
		if (!!this.route.snapshot.params && this.route.snapshot.params['id']) {
			this.id = this.route.snapshot.params['id'];
		}
		this.getInitialData();
		this.initForm();
	}

	get formDataGoal() {
		return this.goalForm.controls;
	}

	private initForm(): void {
		this.goalForm = new FormGroup({
			sphere: new FormControl({ value: "", disabled: true }, [Validators.required]),
			completion_date: new FormControl({ value: "", disabled: true }, [Validators.required]),
			define_goal: new FormControl('', [Validators.required]),
			action_step_1: new FormControl('', [Validators.required]),
			action_step_2: new FormControl(''),
			action_step_3: new FormControl(''),
			action_step_4: new FormControl(''),
			action_step_5: new FormControl(''),
			action_step_6: new FormControl(''),
			completion_date_1: new FormControl('', [Validators.required]),
			completion_date_2: new FormControl(null, []),
			completion_date_3: new FormControl(null, []),
			completion_date_4: new FormControl(null, []),
			completion_date_5: new FormControl(null, []),
			completion_date_6: new FormControl(null, []),
		}, { 'updateOn': 'change' });
	}

	private getInitialData(): void {
		const urls: string[] = [
			ApiRoutes.sphereList,
			`${ApiRoutes.goal}` + `${this.id}/`
		];
		this.ds.forkJoin(urls).subscribe({
			next: (res: any) => {
				if (res.length) {
					this.sphereList = res[0].results;
					this.goalForm.patchValue(res[1]);
					const temp: string[] = ["completion_date_1", "completion_date_2", "completion_date_3", "completion_date_4", "completion_date_5", "completion_date_6"];
					for (let i = 0; i < temp.length; i++) {
						if (this.goalForm.get(temp[i])?.value) {
							// const dateArr: string[] = this.goalForm.get(temp[i])?.value.split("-");
							// console.log(dateArr)
							this.goalForm.get(temp[i])?.setValue(dateToObjDate(this.goalForm.get(temp[i])?.value));
						}
					}
					this.onSphereChange();
				}
			},
			error: (err: any) => console.log(err),
			complete: () => { }
		});
	}

	private onSphereChange(): void {
		const id: number = this.goalForm.get('sphere')?.value;
		if (id) {
			const val: string = this.sphereList.find(k => k.id == id).name;
			this.selectedSphereActionStep = this.actionSteps.find(i => i.key == val).arr;
		}
	}

	submit(): void {
		if (this.goalForm.invalid) {
			this.isSubmitting = true;
			return;
		}
		this.spinner.show();
		const temp: string[] = ["completion_date_1", "completion_date_2", "completion_date_3", "completion_date_4", "completion_date_5", "completion_date_6"];
		for (let i = 0; i < temp.length; i++) {
			if (this.goalForm.get(temp[i])?.value) {
				this.goalForm.get(temp[i])?.setValue(objToDateObj(this.goalForm.get(temp[i])?.value));
			}
		}
		this.ds.patch(`${ApiRoutes.goal}` + `${this.id}/`, this.goalForm.getRawValue()).subscribe({
			next: (res) => {
				this.spinner.hide();
				this.ts.success("Goal updated successfully!", "Success");
				this.router.navigate([APP_ROUTES.goal, 'pending']);
			},
			error: (err) => this.spinner.hide(),
			complete: () => this.spinner.hide()
		});
	}
}
