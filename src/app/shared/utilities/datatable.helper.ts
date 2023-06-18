import { DatePipe } from "@angular/common";

export function nullable() {
	return { transform: (value: any) => value ? value : '--' };
}

export function dollar() {
	return { transform: (value: any) => value ? ('$ ' + value) : '--' };
}

export function formatDateWithoutTime() {
	return { transform: (value: any) => value ? new DatePipe('en-US').transform(value, 'EE, MMM dd, yyyy') : '--' };
}

export function fname() {
	return { transform: (value: any) => value ? value.split(' ').slice(0, -1).join(' ') : '--' };
}

export function lname() {
	return { transform: (value: any) => value ? value.split(' ').slice(-1).join(' ') : '--' };
}