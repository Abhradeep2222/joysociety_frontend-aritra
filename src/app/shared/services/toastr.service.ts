import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toastrConfig: Partial<IndividualConfig> = {
        progressBar: true,
        timeOut: 8000,
        tapToDismiss: true,
        closeButton: true
    }
    constructor(public toastr: ToastrService) { }

    public success(msg: string, title: string = 'Success!'): void {
        this.toastr.success(msg, title, this.toastrConfig);
    }

    public error(msg: string, title: string = 'Error!'): void {
        this.toastr.error(msg, title, this.toastrConfig);
    }

    public warning(msg: string, title: string = 'Warning!'): void {
        this.toastr.warning(msg, title, this.toastrConfig);
    }
}