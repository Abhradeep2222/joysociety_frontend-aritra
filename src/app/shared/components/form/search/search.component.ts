import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription } from 'rxjs';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	@ViewChild('input') input!: ElementRef;
	@Output() listener: EventEmitter<any> = new EventEmitter();
	subscriptions: Subscription = new Subscription();
	
	constructor() { }

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			const searchEvt = fromEvent(this.input.nativeElement, 'keyup').pipe(debounceTime(500), distinctUntilChanged()).subscribe((data: any) => {
				console.log(this.input.nativeElement.value)
				this.listener.emit(this.input.nativeElement.value);
			});
			this.subscriptions.add(searchEvt);
		});
	}

	onSearch(event: any): void {
		if (!event.target.value) {
			this.listener.emit("");
		}
	}
}