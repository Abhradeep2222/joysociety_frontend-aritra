import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-member-message',
	templateUrl: './member-message.component.html',
	styleUrls: ['./member-message.component.scss']
})
export class MemberMessageComponent implements OnInit {
	isSubmitting: boolean = false;
	form!: FormGroup;
	
	constructor() { }

	ngOnInit(): void {
		this.intiForm();
	}

	get formData() {
		return this.form.controls;
	}

	private intiForm(): void {
		this.form = new FormGroup({
			message: new FormControl("", [Validators.required]),
		}, { 'updateOn': 'change' });
	}

	Send(): void {
		if (this.form.invalid) {
			this.isSubmitting = true;
			return;
		}
		this.isSubmitting = false;
	}

	cancel(): void {
		this.form.get("message")?.setValue("");
	}
}