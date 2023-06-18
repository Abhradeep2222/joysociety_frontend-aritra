import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';
import { ToastService } from '../../../../shared/services/toastr.service';
import { environment } from '../../../../../environments/environment';

@Component({
	selector: 'app-postpopup',
	templateUrl: './postpopup.component.html',
	styleUrls: ['./postpopup.component.scss']
})

export class PostpopupComponent implements OnInit {
	@Input() data?: any;
	apiKey: string = environment.tinymceKey;
	form!: FormGroup;
	isSubmitting: boolean = false;
	// profileDetail: any;
	tinymceConfigQuick: any = {
		height: 150,
		menubar: false,
		style_formats: [],
		block_formats: '',
		plugins: 'emoticons',
		toolbar: 'emoticons',
		placeholder: "What would you like to ask?",
		statusbar: false
	};
	tinymceConfigLong: any = {
		height: 500,
		statusbar: false,
		menubar: 'file edit view insert format tools table help',
		style_formats: [
			// { title: 'Heading 1', format: 'h1' },
			// { title: 'Heading 2', format: 'h2' },
			{ title: 'Heading 3', format: 'h3' },
			{ title: 'Heading 4', format: 'h4' },
			{ title: 'Heading 5', format: 'h5' },
			{ title: 'Heading 6', format: 'h6' },
		],
		block_formats: 'Paragraph=p; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6; Preformatted=pre',
		plugins: 'advlist autolink lists link image charmap preview anchor casechange linkchecker searchreplace visualchars \
				visualblocks code fullscreen insertdatetime media table powerpaste code emoticons help',  //imagetools
		toolbar: 'undo redo | casechange | fontsizeselect formatselect | ' +
			'bold italic underline strikethrough backcolor | alignleft aligncenter ' +
			'alignright alignjustify | bullist numlist outdent indent | ' +
			'image | media | link | removeformat | emoticons | help',
		image_class_list: [
			{ title: 'Responsiveness', value: 'img-fluid img-responsive' }
		],
		placeholder: "Share what's on your mind...",
		image_advtab: false,
		elementpath: false,
		// skin: "lightgray",
		// theme: 'modern',
		image_title: true,
		automatic_uploads: true,
		/* and here's our custom image picker*/
		file_picker_callback: (callback: any, value: any, meta: any) => {
			console.log(meta)
			if (meta.filetype == 'image') {
				var input = document.createElement('input');
				input.setAttribute('type', 'file');
				input.setAttribute('accept', 'image/*');
				input.onchange = () => {
					var file = input.files![0];
					this.spinner.show();
					const formData = new FormData();
					formData.append("file", file);
					formData.append("category", "Post");
					this.ds.post(ApiRoutes.upload, formData).subscribe({
						next: (res: any) => {
							if (res.fle) {
								let reader: any = new FileReader();
								reader.onload = (e: any) => {
									// if (res.fle.includes("http:")) {
									// 	res.fle = res.fle.replace(/http:/g, "https:");
									// }
									callback(res.fle, { title: file.name });
								};
								reader.readAsDataURL(file);
							}
							this.spinner.hide();
						},
						error: (err: any) => {
							console.log(err);
							this.spinner.hide();
							this.ts.error("Something went wrong!", "Error");
						},
						complete: () => { }
					});
				};
				input.click();
			}
		},
		// video_template_callback: (data: any) => {
		// 	console.log(data)
		// 	return '<video width="' + data.width + '" height="' + data.height + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls">\n' + '<source src="' + data.source + '"' + (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') + ' />\n' + (data.altsource ? '<source src="' + data.altsource + '"' + (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') + ' />\n' : '') + '</video>';
		// }
	};
	postType: string = 'quick';
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

	constructor(private readonly spinner: NgxSpinnerService, private readonly ds: DataService, private readonly ts: ToastService, private readonly activeModal: NgbActiveModal) { }

	ngOnInit(): void {
		console.log(this.data);
		// this.profileDetail = this.ds.state.get('profileData');
		if (!this.data) {
			this.getWorkShops();
		}
		this.initForm();
	}

	get formData() {
		return this.form.controls;
	}

	private initForm(): void {
		this.form = new FormGroup({
			post: new FormControl('', [Validators.required]),
			workshop: new FormControl((!!this.data && this.data.parent == 'workshop') ? this.data.id : null),
			topic: new FormControl(null),
			tribe: new FormControl((!!this.data && this.data.parent == 'tribe') ? this.data.id : null),
			// user: new FormControl(this.profileDetail.id, [Validators.required]),
		}, { 'updateOn': 'change' });
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

	onPostTypeChange(type: string): void {
		this.form.get("post")?.setValue("");
		this.postType = type;
	}

	submit(): void {
		let url!: string;
		if (this.form.get("post")?.value) {
			this.form.get("post")?.setErrors(null);
		}
		if (this.postType == 'quick') {
			if (this.form.get("post")?.value.length > 1000) {
				this.form.get("post")?.setErrors({ maxlength: true, allowed: 1000 });
			}
			url = ApiRoutes.quickPost;
		} else if (this.postType == 'long') {
			if (this.form.get("post")?.value.length > 5000) {
				this.form.get("post")?.setErrors({ maxlength: true, allowed: 5000 });
			}
			url = ApiRoutes.longPost;
		}
		this.form.updateValueAndValidity();
		if (this.form.invalid) {
			this.isSubmitting = true;
			return;
		}
		this.isSubmitting = false;
		this.spinner.show();
		this.ds.post(url, this.form.value).subscribe({
			next: (res: any) => {
				if (!!res && res.id) {
					this.activeModal.close(true);
					this.ts.success("Post created successfully!", "Success");
				}
			},
			error: (err: any) => {
				console.log(err);
				this.spinner.hide()
			},
			complete: () => this.spinner.hide()
		});
	}

	cancel(): void {
		this.activeModal.close();
	}
}