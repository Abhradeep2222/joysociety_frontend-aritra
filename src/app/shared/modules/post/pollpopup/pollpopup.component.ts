import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';
import { ToastService } from '../../../../shared/services/toastr.service';
import { environment } from '../../../../../environments/environment';

@Component({
	selector: 'app-pollpopup',
	templateUrl: './pollpopup.component.html',
	styleUrls: ['./pollpopup.component.scss']
})
export class PollpopupComponent implements OnInit {
	apiKey: string = environment.tinymceKey;
	form!: FormGroup;
	isSubmitting: boolean = false;
	// profileDetail: any;
	postType!: string;
	postingToSelected: any = { id: null, title: "Joy Society" };
	postingToData: any[] = [];
	postingToPayload: any = {
		page: 1,
		page_size: 10,
		search: "",
		ordering: "-created_on",
	};
	postingToCount: number = 0;
	postingToView: number = 1;
	tinymceConfig: any = {
		height: 250,
		menubar: false,
		style_formats: [],
		block_formats: '',
		plugins: 'emoticons',
		toolbar: 'emoticons',
		placeholder: "What would you like to ask?",
		statusbar: false
	};

	constructor(private readonly fb: FormBuilder, private readonly spinner: NgxSpinnerService, private readonly ds: DataService, private readonly ts: ToastService, private readonly activeModal: NgbActiveModal) { }

	ngOnInit(): void {
		// this.profileDetail = this.ds.state.get('profileData');
		this.getWorkShops();
		this.initForm();
	}

	get formData() {
		return this.form.controls;
	}

	get answerChoice(): FormArray {
		return this.form.get("answer_choice") as FormArray
	}

	private initForm(): void {
		this.form = new FormGroup({
			question: new FormControl('', [Validators.required]),
			_type: new FormControl('QUESTION', [Validators.required]),
			workshop: new FormControl(null),
			topic: new FormControl(null),
			tribe: new FormControl(null),
			// user: new FormControl(this.profileDetail.id, [Validators.required]),
		}, { 'updateOn': 'change' });
		// "HOT COLD"
	}

	openTab(tab: number): void {
		this.postingToView = tab;
		this.postingToData = [];
		this.postingToPayload = {
			page: 1,
			page_size: 10,
			search: "",
			ordering: "-created_on",
		};
		this.postingToCount = 0;
		switch (this.postingToView) {
			case 1:
				this.getWorkShops();
				break;
			case 2:
				this.getTribes();
				break;
		}
	}

	private getWorkShops(): void {
		this.ds.get(this.ds.formUrlParam(ApiRoutes.workshops, this.postingToPayload)).subscribe({
			next: (res: any) => {
				this.postingToCount = res.count;
				if (res.count) {
					this.postingToData = [...this.postingToData, ...res.results];
					console.log(this.postingToData);
				}
			},
			error: (err) => console.error(err),
			complete: () => { }
		});
	}

	private getTribes(): void {
		this.ds.get(this.ds.formUrlParam(ApiRoutes.tribe, this.postingToPayload)).subscribe({
			next: (res: any) => {
				this.postingToCount = res.count;
				if (res.count) {
					this.postingToData = [...this.postingToData, ...res.results];
				}
			},
			error: (err) => console.error(err),
			complete: () => { }
		});
	}

	onPollTypeChange(): void {
		if (this.form.get("_type")?.value === "MULTIPLE CHOICE") {
			this.form.addControl('answer_choice', this.fb.array([this.answerChoiceField()]));
			this.addAnswerChoiceFields();
		} else {
			this.form.removeControl('answer_choice');
		}
		console.log(this.form.controls);
	}

	answerChoiceField(): FormGroup {
		return this.fb.group({
			answer: new FormControl('', [Validators.required])
		});
	}

	addAnswerChoiceFields() {
		this.answerChoice.push(this.answerChoiceField());
	}

	removeAnswerChoiceields(index: number): void {
		this.answerChoice.removeAt(index);
	}

	filter(e: any): void {
		this.postingToData = [];
		this.postingToPayload.search = e;
		if (this.postingToView == 1) {
			this.getWorkShops();
		} else if (this.postingToView == 2) {
			this.getTribes();
		}
	}

	postTo(control: string, item: any): void {
		this.postingToSelected = item;
		if (!control) {
			this.form.get("workshop")?.setValue(null);
			this.form.get("topic")?.setValue(null);
			this.form.get("tribe")?.setValue(null);
		} else {
			this.form.get(control)?.setValue(item.id);
		}
	}

	scroll(e: any) {
		if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
			if (this.postingToData.length < this.postingToCount) {
				this.postingToPayload.page++;
				if (this.postingToView == 1) {
					this.getWorkShops();
				} else if (this.postingToView == 2) {
					this.getTribes();
				}
			}
		}
	}

	cancel(): void { this.activeModal.close() }

	submit(): void {
		if (this.form.invalid) {
			this.isSubmitting = true;
			return;
		}
		this.isSubmitting = false;
		this.spinner.show();
		this.ds.post(ApiRoutes.poll, this.payload).subscribe({
			next: (res: any) => {
				if (!!res && res.id) {
					this.activeModal.close(true);
					this.ts.success("Poll created successfully!", "Success");
				}
			},
			error: (err: any) => {
				console.log(err);
				this.spinner.hide()
			},
			complete: () => this.spinner.hide()
		});
	}

	get payload(): any {
		if (this.form.get("_type")?.value === "MULTIPLE CHOICE") {
			const payload: any = { ...this.form.value };
			const answers: string[] = [];
			for (let i = 0; i < payload.answer_choice.length; i++) {
				answers.push(payload.answer_choice[i].answer);
			}
			payload.answer_choice = answers;
			return payload;
		}
		return this.form.value;
	}
}