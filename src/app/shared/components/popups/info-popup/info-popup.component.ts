import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-info-popup',
	templateUrl: './info-popup.component.html',
	styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent implements OnInit {
	@Input() data: any;

	constructor(private readonly activeModal: NgbActiveModal) { }

	ngOnInit(): void { }

	okAction(): void {
		this.activeModal.close(true);
	}

	cancelAction(): void {
		this.activeModal.close();
	}

}
