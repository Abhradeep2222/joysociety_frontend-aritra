import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastService } from '../../../../shared/services/toastr.service';
import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';
import { actionStepsAll } from "../goal.config";
import { APP_ROUTES } from '../../../../shared/routes/app-routes';
import { objToDateObj } from "../../../../shared/utilities";

@Component({
	selector: 'app-reflection',
	templateUrl: './reflection.component.html',
	styleUrls: ['./reflection.component.scss']
})
export class ReflectionComponent implements OnInit {
	view: number = 1;
	totalSteps: any[] = [
		{ step: 1, status: "completed" },
		{ step: 2, status: "" },
		{ step: 3, status: "" },
		{ step: 4, status: "" },
		{ step: 5, status: "" },
	];
	reflectionData: any[] = [];
	sphereList: any[] = [];
	isSubmitting: boolean = false;
	isSubmitting1: boolean = false;
	formReflection!: FormGroup;
	goalForm!: FormGroup;
	actionSteps: any[] = actionStepsAll;
	selectedSphereActionStep: string[] = [];
	sphere_1Value:any;
	sphere_1name:any;
	sphere_2Value:any;

	constructor(private readonly ds: DataService, private readonly spinner: NgxSpinnerService, private readonly router: Router, private readonly ts: ToastService) { }

	ngOnInit(): void {
		this.initForm();
		this.getReflection();
	}

	get formDataReflection() {
		return this.formReflection.controls;
	}

	get formDataGoal() {
		return this.goalForm.controls;
	}

	private initForm(): void {
		this.formReflection = new FormGroup({
			sphere_1: new FormControl('', [Validators.required]),
			sphere_2: new FormControl('', [Validators.required]),
			sphere_1_answer: new FormControl('', [Validators.required]),
			sphere_2_answer: new FormControl('', [Validators.required]),
		}, { 'updateOn': 'change' });

		this.goalForm = new FormGroup({
			sphere: new FormControl('', [Validators.required]),
			completion_date: new FormControl('', [Validators.required]),
			define_goal: new FormControl('', [Validators.required]),
			// why: new FormControl('', [Validators.required]),
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
			potential_barriers: new FormControl(''),
			support_and_resources: new FormControl(''),
			connection_sessions: new FormControl(false),
			networking_connecting: new FormControl(false),
			accountablity_checkpoint: new FormControl(false),
			self_paced_learning: new FormControl(false),
			wducationnal_webinar: new FormControl(false),
			join_tribe: new FormControl(false),
			
		}, { 'updateOn': 'change' });
	}

	private getReflection(): void {
		const urls: string[] = [
			ApiRoutes.truSuccessReport,
			this.ds.formUrlParam(ApiRoutes.truSuccessReport, { report_type: 'COMPREHENSIVE', per_page: 40 }),
			ApiRoutes.sphereList
		];
		this.ds.forkJoin(urls).subscribe({
			next: (res: any) => {
				if (res.length) {
					const part1: any = res[0].report.map((i: any) => {
						i['score1'] = i.score;
						delete i.score;
						return i;
					});
					const part2: any = res[1].report.map((i: any) => {
						i['score2'] = i.score;
						delete i.score;
						return i;
					});
					this.reflectionData = part1.map((item: any, i: number) => Object.assign({}, item, part2[i]));
					this.sphereList = res[2].results;
					console.log(this.sphereList,'----->val')
				}
			},
			error: (err: any) => console.log(err),
			complete: () => { }
		});
	}

	validateSelection(): void {

		if (this.formReflection.get('sphere_1')?.value == this.formReflection.get('sphere_2')?.value) {
			this.formReflection.get('sphere_2')?.setErrors({ duplicate: true })
		}
		this.sphere_1Value=parseInt(this.formReflection.get('sphere_1')?.value)
		this.sphere_2Value=parseInt(this.formReflection.get('sphere_2')?.value)
	}

	onSphereChange(): void {
		const id: number = this.goalForm.get('sphere')?.value;
		if (id) {
			const val: string = this.sphereList.find(k => k.id == id).name;
			this.selectedSphereActionStep = this.actionSteps.find(i => i.key == val).arr;
			console.log(this.selectedSphereActionStep);
		}
	}

	skip(screen: number): void {
		this.totalSteps.map(i => {
			if (i.step <= screen) {
				i.status = "completed";
			}
			return i;
		});
		this.view = screen;
	}

	next(screen: number): void {
		if (screen < 4) {
			this.totalSteps.find(i => i.step == screen).status = "completed";
			this.view = screen;
		} else if (screen == 4) {
			if (this.formReflection.invalid) {
				this.isSubmitting = true;
				return;
			}
			this.isSubmitting = false;
			this.spinner.show();
			this.ds.post(ApiRoutes.goalReflection, this.formReflection.value).subscribe({
				next: (res: any) => {
					if (!!res) {
						this.totalSteps.find(i => i.step == screen).status = "completed";
						this.view = screen;
					}
				},
				error: (err: any) => this.spinner.hide(),
				complete: () => this.spinner.hide()
			});
		} 
		else if (screen == 5) {
			
			if (this.goalForm.invalid) {
				this.isSubmitting1 = true;
				return;
			}
			this.isSubmitting1 = false;
			this.totalSteps.find(i => i.step == screen).status = "completed";
			this.view = screen;
		}
		 else if (screen == 6) {
			if (this.goalForm.invalid) {
				this.isSubmitting1 = true;
				return;
			}
			this.isSubmitting1 = false;
			this.spinner.show();
			const temp: string[] = ["completion_date", "completion_date_1", "completion_date_2", "completion_date_3", "completion_date_4", "completion_date_5", "completion_date_6"];
			for (let i = 0; i < temp.length; i++) {
				if (this.goalForm.get(temp[i])?.value) {
					this.goalForm.get(temp[i])?.setValue(objToDateObj(this.goalForm.get(temp[i])?.value));
				}
			}
			this.ds.post(ApiRoutes.goal, this.goalForm.value).subscribe({
				next: (res: any) => {
					
					if (!!res) {
						this.ts.success("Goal set successfully!", "Success");
						this.router.navigate([APP_ROUTES.goal]);
						console.log("shivani is a developer .....");	
					}
				},
				error: (err: any) =>{ 
					console.log('error shivani orignal');
					
					this.spinner.hide()},
				complete: () => this.spinner.hide()
			});
		}
	}
}