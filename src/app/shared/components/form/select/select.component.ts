import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

import { DataService } from "../../../services/data.service";
import { ISelect } from "../../../../interfaces";

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss']
})

export class SelectComponent implements OnInit {
	input$ = new Subject<string>();
	items: any[] = [];
	@Input() config!: ISelect;
	@Output() emitter = new EventEmitter()
	subs: Subscription = new Subscription();
	isLoading: boolean = false;
	search!: string;
	defaultValue: any;
	countryId!: string | number;
	stateId!: string | number;

	constructor(private readonly ds: DataService) { }

	ngOnInit(): void {
		// console.log(this.config);
		if (!!this.config.defalutValue) {
			this.items.push(this.config.defalutValue);
			this.defaultValue = this.config.defalutValue.id;
			const data: any = {
				control: this.config.control,
				data: this.config.defalutValue
			}
			this.emitter.emit(data);
		}
		const sub = this.input$.pipe(debounceTime(500)).subscribe((term: string) => {
			if (term) {
				this.search = term;
				this.isLoading = true;
				this.getData();
			}
		});
		this.subs.add(sub);
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

	private getData(): void {
		const payload: any = { 
			search: this.search, 
			page_size: 50 
		};
		if (this.config.control === "state") {
			payload.country_id = this.ds.countryId
		} else if(this.config.control === "city") {
			payload.state_id = this.ds.stateId
		}
		this.ds.get(this.ds.formUrlParam(this.config.api, payload)).subscribe(res => {
			if (res.count) {
				this.items = [...this.items, ...res.results];
				this.isLoading = false;
			}
		});
	}

	clear(): void {
		this.items = [];
		const data: any = {
			control: this.config.control,
			data: null
		};
		this.emitter.emit(data);
	}

	change(e: any): void {
		if (!!e) {
			const data: any = {
				control: this.config.control,
				data: e
			}
			if (this.config.control === "country") {
				this.ds.countryId = e.id;
			} else if(this.config.control === "state") {
				this.ds.stateId = e.id;
			}
			this.emitter.emit(data);
		}
	}

	scrollToEnd(e: any): void {
		if (e === 'end') {
			console.log(e)
			this.getData();
		}
	}
}