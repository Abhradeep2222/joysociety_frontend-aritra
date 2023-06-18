import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

import { ApiRoutes } from '../../../../shared/routes/api.routes';
import { DataService } from '../../../../shared/services/data.service';
import { ToastService } from '../../../../shared/services/toastr.service';

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {
    @Input() data: any;
	isSubmitting: boolean = false;
	form!: FormGroup;
	apiKey: string = environment.tinymceKey;
	tinymceConfig: any = {
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
					formData.append("category", this.data.mediaType);
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
	}

    constructor(private readonly spinner: NgxSpinnerService, private readonly ds: DataService, private readonly ts: ToastService, private readonly activeModal: NgbActiveModal) { }

	ngOnInit(): void {
		console.log(this.data);
		this.intiForm();
	}

	get formData() {
		return this.form.controls;
	}

	private intiForm(): void {
		this.form = this.data.form;
	}

    cancelAction(): void {
		this.activeModal.close();
	}

	submit(): void {
		if (this.form.invalid) {
			this.isSubmitting = true;
			return;
		}
		this.isSubmitting = false;
        if (this.data.mode == 'create') {
            this.spinner.show();
            this.ds.post(this.data.api, this.form.value).subscribe({
                next: (res: any) => {
                    if (!!res && res.id) {
                        this.activeModal.close(true);
                    }
                    this.spinner.hide();
                },
                error: (err: any) => this.spinner.hide(),
                complete: () => this.spinner.hide()
            });
        } else {
            this.spinner.show();
            this.ds.put(this.data.api, this.form.value).subscribe({
                next: (res: any) => {
                    if (!!res && res.id) {
                        this.activeModal.close(true);
                    }
                    this.spinner.hide();
                },
                error: (err: any) => this.spinner.hide(),
                complete: () => this.spinner.hide()
            });
        }
	}
}