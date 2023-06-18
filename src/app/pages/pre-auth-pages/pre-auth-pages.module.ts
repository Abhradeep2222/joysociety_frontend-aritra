import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { PopupsModule } from "../../shared/components/popups/popups.module";
import { ImageCropperModule } from "../../shared/modules/image-cropper/image-cropper.module";	

import { PreAuthRoutingModule } from "./pre-auth-routing.module";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		PreAuthRoutingModule,
		NgxIntlTelInputModule,
		PopupsModule,
		ImageCropperModule
	],
	declarations: [
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent
	],
})

export class PreAuthModule { }