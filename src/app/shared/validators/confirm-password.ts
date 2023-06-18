import { AbstractControl, FormGroup } from "@angular/forms";

export function confirmPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control: AbstractControl = formGroup.controls[controlName];
        const matchingControl: AbstractControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) { return }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}