import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { SelectComponent } from './select/select.component';
import { SearchComponent } from './search/search.component';

@NgModule({
	declarations: [
		SelectComponent,
		SearchComponent
	],
	imports: [
		CommonModule,
		NgSelectModule,
		FormsModule,
		ReactiveFormsModule,
	],
	exports: [
		SelectComponent,
		SearchComponent
	],
})

export class FormModule { }