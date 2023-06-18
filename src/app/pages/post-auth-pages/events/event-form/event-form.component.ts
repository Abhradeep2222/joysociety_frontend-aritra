import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';
import { APP_ROUTES } from '../../../../shared/routes/app-routes';
import { ToastService } from '../../../../shared/services/toastr.service';
import { dateToObjDate, objToDateObj } from 'src/app/shared/utilities';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-event-form',
	templateUrl: './event-form.component.html',
	styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
	minDate:NgbDateStruct
	isSubmitting: boolean = false;
	form!: FormGroup;
	id!: string;
	eventDetail!: any;
	topics: any[] = [];
	topicPayload: any = {
		page: 1,
		page_size: 1000,
		search: "",
		ordering: "-created_on",
	};
	imageChangedEvent!: any;
	croppedFile: any = null;
	croppedImage!: any;
	showCropper: boolean = false;
	days: any[] = [
		{ isSelected: false, day: "Sun" },
		{ isSelected: false, day: "Mon" },
		{ isSelected: false, day: "Tue" },
		{ isSelected: false, day: "Wed" },
		{ isSelected: false, day: "Thu" },
		{ isSelected: false, day: "Fri" },
		{ isSelected: false, day: "Sat" }
	];
	isDuplicate: boolean = false;

	constructor(private ds: DataService, private readonly spinner: NgxSpinnerService, private readonly router: Router, private readonly route: ActivatedRoute, private readonly toastr: ToastService) { 
		this.minDate=this.convertDateToNgbDate(new Date())
	}

	ngOnInit(): void {
		this.getRequiredData();
		this.intiForm();
		if (!!this.route.snapshot.params && this.route.snapshot.params['id']) {
			this.id = this.route.snapshot.params['id'];
			if (this.route.snapshot.queryParams['duplicate']) {
				this.isDuplicate = this.route.snapshot.queryParams['duplicate'];
			}
			this.getEventDetail();
		}
	}

	private getRequiredData(): void {
		const urls: string[] = [this.ds.formUrlParam(ApiRoutes.topic, this.topicPayload)];
		this.ds.forkJoin(urls).subscribe({
			next: (res) => {
				if (res.length) {
					this.topics = res[0].results;
				}
			},
			error: (err) => console.log(err),
			complete: () => { }
		})
	}

	get formData() {
		return this.form.controls;
	}
	private convertDateToNgbDate(date: Date): NgbDateStruct {
		return {
		  year: date.getFullYear(),
		  month: date.getMonth() + 1,
		  day: date.getDate()
		};
	  }
	

	private intiForm(): void {
		this.form = new FormGroup({
			event_image: new FormControl("", [Validators.required]),
			title: new FormControl("", [Validators.required]),
			topic: new FormControl(""),
			is_feed: new FormControl(true),
			start_date: new FormControl("", [Validators.required]),
			end_date: new FormControl('', [Validators.required]),
			start_time: new FormControl('', [Validators.required]),
			end_time: new FormControl('', [Validators.required]),
			repeat_event: new FormControl(false),
			frequency: new FormControl(''),
			event_type: new FormControl("ONLINE"),
			description: new FormControl("", [Validators.required]),
		}, { 'updateOn': 'change' });
	}

	getEventDetail(): void {
		this.ds.get(ApiRoutes.events + `${this.id}/`).subscribe({
			next: (res: any) => {
				if (!!res) {
					this.eventDetail = res;
					this.patchForm(['title', 'topic', 'is_feed', 'repeat_event', 'event_type', 'description']);
					console.log(this.eventDetail);
				}
			},
			error: (err: any) => console.log(err),
			complete: () => {}
		});
	}

	private patchForm(controls: string[]): void {
		if (this.eventDetail.event_image) {
			this.form.get('event_image')?.setValue(this.eventDetail.event_image);
			this.croppedImage = this.eventDetail.event_image;
		}
		for (let i = 0; i < controls.length; i++) {
			this.form.get(controls[i])?.patchValue(this.eventDetail[controls[i]]);
		}
		this.form.get('start_date')?.setValue(dateToObjDate(moment(this.eventDetail.start_datetime).format("YYYY-MM-DD")));
		this.form.get('end_date')?.setValue(dateToObjDate(moment(this.eventDetail.end_datetime).format("YYYY-MM-DD")));
		this.form.get('start_time')?.setValue(moment(this.eventDetail.start_datetime).format("hh:mm"));
		this.form.get('end_time')?.setValue(moment(this.eventDetail.end_datetime).format("hh:mm"));
		if (!!this.eventDetail.event_config) {
			if (this.eventDetail.repeat_event) {
				this.form.get("frequency")?.setValue(this.eventDetail.event_config.event_frequency.frequency)
				if (this.eventDetail.event_config.event_frequency.frequency === 'CUSTOM') {
					this.form.addControl("occurrence", new FormControl(this.eventDetail.event_config.event_frequency.occurrence, [Validators.required]));
					this.form.addControl("occurrence_frequency", new FormControl(this.eventDetail.event_config.event_frequency.occurrence_frequency, [Validators.required]));
					this.form.addControl("repeat_ends", new FormControl(this.eventDetail.event_config.event_frequency.repeat_ends, [Validators.required]));
					if (this.eventDetail.event_config.event_frequency.occurrence_frequency === 'MONTH') {
						this.form.addControl("repeat_on", new FormControl(this.eventDetail.event_config.event_frequency.repeat_on, [Validators.required]));
					} else if (this.eventDetail.event_config.event_frequency.occurrence_frequency === 'WEEK') {
						this.patchDays();
						this.form.addControl("repeat_on", new FormControl(this.eventDetail.event_config.event_frequency.repeat_on, [Validators.required]));
					}
					if (this.eventDetail.event_config.event_frequency.repeat_ends !== 'NEVER') {
						if (this.eventDetail.event_config.event_frequency.repeat_ends === 'DATE') {
							this.form.addControl("repeat_ends_value", new FormControl(dateToObjDate(moment(this.eventDetail.event_config.event_frequency.repeat_ends_value).format("YYYY-MM-DD")), [Validators.required]));
						} else {
							this.form.addControl("repeat_ends_value", new FormControl(this.eventDetail.event_config.event_frequency.repeat_ends_value, [Validators.required]));
						}
					}
				}
			}
		}
	}

	patchDays(): void {
		for (let i = 0; i < this.eventDetail.event_config.event_frequency.repeat_on.length; i++) {
			const el: any = this.eventDetail.event_config.event_frequency.repeat_on[i];
			const index: number = this.days.findIndex(a => a.day == el);
			if (index > -1) {
				this.days[index].isSelected = true;
			}
		}
	}

	onEventTypeChange(): void {
		if (this.form.get("event_type")?.value === 'LOCAL') {
			this.form.addControl('venue', new FormControl('', [Validators.required]));
			this.form.addControl('street_address', new FormControl('', [Validators.required]));
			this.form.addControl('cityStateZip', new FormControl('', [Validators.required]));
			this.form.addControl('optional_link', new FormControl(''));
		} else {
			this.form.removeControl('venue');
			this.form.removeControl('street_address');
			this.form.removeControl('cityStateZip');
			this.form.removeControl('optional_link');
		}
		console.log(this.form);
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
					this.form.get("event_image")?.setErrors(null);
				} else {
					this.form.get("event_image")?.setErrors({ dimensionErr: true });
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
		formdata.append("category", "Event");
		this.ds.post(ApiRoutes.upload, formdata).subscribe(res => {
			if (res.fle) {
				this.form.get('event_image')?.setValue(res.fle);
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
		this.form.get('event_image')?.setValue("");
	}

	onRepeatEventChange(): void {
		if (this.form.get("repeat_event")?.value) {
			this.form.get("frequency")?.setValidators([Validators.required]);
		} else {
			this.form.get("frequency")?.setValue("");
			this.form.get("frequency")?.setValidators(null);
			this.onfrequencyChange();
		}
		this.form.get("frequency")?.updateValueAndValidity();
	}

	onfrequencyChange(): void {
		if (this.form.get("frequency")?.value == "CUSTOM") {
			this.form.addControl("occurrence", new FormControl(this.eventDetail?.event_config.event_frequency.occurrence ? this.eventDetail?.event_config.event_frequency.occurrence : "1", [Validators.required]));
			this.form.addControl("occurrence_frequency", new FormControl(this.eventDetail?.event_config.event_frequency.occurrence_frequency ? this.eventDetail?.event_config.event_frequency.occurrence_frequency : "DAY", [Validators.required]));
			this.form.addControl("repeat_ends", new FormControl(this.eventDetail?.event_config.event_frequency.repeat_ends ? this.eventDetail?.event_config.event_frequency.repeat_ends : "NEVER", [Validators.required]));
		} else {
			this.form.removeControl("occurrence");
			this.form.removeControl("occurrence_frequency");
			this.form.removeControl("repeat_ends");
		}
	}

	onOccurrenceFrequencyChange(): void {
		this.resetDaysSelection();
		if (this.form.get("occurrence_frequency")?.value == "MONTH") {
			this.form.removeControl("repeat_on");
			this.form.addControl("repeat_on", new FormControl(this.eventDetail?.event_config.event_frequency.repeat_on ? this.eventDetail?.event_config.event_frequency.repeat_on : "Monthly on day 13", [Validators.required]));
		} else if (this.form.get("occurrence_frequency")?.value == "WEEK") {
			this.form.removeControl("repeat_on");
			if (this.eventDetail?.event_config.event_frequency.repeat_on) {
				this.patchDays();
			}
			this.form.addControl("repeat_on", new FormControl(this.eventDetail?.event_config.event_frequency.repeat_on ? this.eventDetail?.event_config.event_frequency.repeat_on : [], [Validators.required]));
		} else {
			this.resetDaysSelection();
			this.form.removeControl("repeat_on");
		}
	}

	resetDaysSelection(): void {
		for (let i = 0; i < this.days.length; i++) {
			this.days[i].isSelected = false;
		}
	}

	onRepeatEndChange(): void {
		if (this.form.get("repeat_ends")?.value == "DATE") {
			this.form.removeControl("repeat_ends_value");
			this.form.addControl("repeat_ends_value", new FormControl(this.eventDetail?.event_config.event_frequency.repeat_ends_value? dateToObjDate(moment(this.eventDetail.event_config.event_frequency.repeat_ends_value).format("YYYY-MM-DD")) : "", [Validators.required]));
		} else if (this.form.get("repeat_ends")?.value == "AFTER") {
			this.form.removeControl("repeat_ends_value");
			this.form.addControl("repeat_ends_value", new FormControl(this.eventDetail?.event_config.event_frequency.repeat_ends_value ? this.eventDetail?.event_config.event_frequency.repeat_ends_value : "10", [Validators.required]));
		} else {
			this.form.removeControl("repeat_ends_value");
		}
	}

	onDaySelection(item: any): void {
		item.isSelected = !item.isSelected;
		const selectedDays: any[] = this.days.filter((i: any) => i.isSelected);
		const a: string[] = []
		for (let i = 0; i < selectedDays.length; i++) {
			a.push(selectedDays[i].day)
		}
		this.form.get("repeat_on")?.setValue(a);
	}

	submit(): void {
		if (this.form.invalid) {
			this.isSubmitting = true;
			return;
		}
		this.isSubmitting = false;
		this.spinner.show();
		const payload: any = this.generatePayload();
		let request: any;
		if (this.id && !this.isDuplicate) {
			request = this.ds.put(ApiRoutes.events + `${this.id}/`, payload);
			
		} else {
			request = this.ds.post(ApiRoutes.events, payload);
		}
		console.log(payload);
		request.subscribe({
			next: (res: any) => {
				if (!!res) {
					this.toastr.success(this.id ? "Event updated successfully!" : "Event created successfully!", "Success");
					this.router.navigate([APP_ROUTES.events]);
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

	private generatePayload(): void {
		const obj: any = {
			title: this.form.get("title")?.value,
			start_datetime: this.getISOdate(this.form.get("start_date")?.value, 'start_time'),
			end_datetime: this.getISOdate(this.form.get("end_date")?.value, 'end_time'),
			repeat_event: this.form.get("repeat_event")?.value,
			event_type: this.form.get("event_type")?.value,
			event_config: {},
			topic: this.form.get("topic")?.value,
			event_image: this.form.get("event_image")?.value,
			description: this.form.get("description")?.value
		}
		if (obj.event_type === 'LOCAL') {
			obj.event_config['event_location'] = {
				venue: this.form.get("venue")?.value,
				street_address: this.form.get("street_address")?.value,
				cityStateZip: this.form.get("cityStateZip")?.value,
				optional_link: this.form.get("")?.value,
			}
		}
		if (obj.repeat_event) {
			obj.event_config['event_frequency'] = {
				frequency: this.form.get("frequency")?.value,
			}
			if (obj.event_config['event_frequency']['frequency'] === 'CUSTOM') {
				obj.event_config['event_frequency']['occurrence'] = this.form.get("occurrence")?.value;
				obj.event_config['event_frequency']['repeat_ends'] = this.form.get("repeat_ends")?.value;
				obj.event_config['event_frequency']['occurrence_frequency'] = this.form.get("occurrence_frequency")?.value;
				if (obj.event_config['event_frequency']['occurrence_frequency'] === 'MONTH' || obj.event_config['event_frequency']['occurrence_frequency'] === 'WEEK') {
					obj.event_config['event_frequency']['repeat_on'] = this.form.get("repeat_on")?.value;
				}
				if (obj.event_config['event_frequency']['repeat_ends'] === 'DATE' || obj.event_config['event_frequency']['repeat_ends'] === 'AFTER') {
					obj.event_config['event_frequency']['repeat_ends_value'] = obj.event_config['event_frequency']['repeat_ends'] === 'DATE' ? this.getISOdate(this.form.get("repeat_ends_value")?.value, '') : this.form.get("repeat_ends_value")?.value;
				}
			}
		}
		return obj;
	}

	private getISOdate(dateobj: any, timeKey: string) {
		let date = objToDateObj(dateobj);
		if (timeKey) {
			const time = this.form.get(timeKey)?.value.split(":");
			return moment(date).set({ hour: Number(time[0]), minute: Number(time[1]), second: 0, millisecond: 0 }).toISOString(true);
		} else {
			return moment(date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toISOString(true);
		}
	}
}
