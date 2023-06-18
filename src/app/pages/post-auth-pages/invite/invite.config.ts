import { nullable, formatDateWithoutTime, fname, lname } from "../../../shared/utilities";

export function columns(key: string | number, cellTemplate: any = {}) {
    let columns: any[] = [];
    if (key == 1) {
        columns = [
            {
                prop: 'first_name',
                name: 'First Name',
                sortable: false,
                draggable: false,
                canAutoResize: true,
                cellClass: 'd-flex align-items-center text-muted text-crop',
                pipe: nullable()
                // cellTemplate: cellTemplate.id,
            },
            {
                prop: 'last_name',
                name: 'Last Name',
                sortable: false,
                draggable: false,
                canAutoResize: true,
                cellClass: 'd-flex align-items-center text-muted text-crop',
                pipe: nullable()
            },
            {
                prop: 'email',
                name: 'Email',
                sortable: false,
                draggable: false,
                canAutoResize: true,
                cellClass: 'd-flex align-items-center text-muted text-crop',
            },
            {
                prop: 'created_on',
                name: 'Last updated',
                sortable: false,
                draggable: false,
                canAutoResize: true,
                cellClass: 'd-flex align-items-center text-muted text-crop',
                pipe: formatDateWithoutTime()
            },
            {
                prop: 'status',
                name: 'Status',
                sortable: false,
                draggable: false,
                canAutoResize: true,
                cellClass: 'd-flex align-items-center text-muted text-crop',
            },
            {
                prop: '',
                name: 'Actions',
                sortable: false,
                draggable: false,
                canAutoResize: true,
                cellClass: 'd-flex align-items-center text-muted text-crop',
                cellTemplate: cellTemplate.actions,
                width: 40
            },
        ];
    } else if (key == 2) {
        columns = [
            // this.form.get("first_name")?.setValue(this.profileDetail.full_name.split(' ').slice(0, -1).join(' '));
		// this.form.get("last_name")?.setValue(this.profileDetail.full_name.split(' ').slice(-1).join(' '));
            {
                prop: 'full_name',
                name: 'First Name',
                sortable: false,
                draggable: false,
                canAutoResize: true,
                cellClass: 'd-flex align-items-center text-muted text-crop',
                pipe: fname()
            },
            {
                prop: 'full_name',
                name: 'Last Name',
                sortable: false,
                draggable: false,
                canAutoResize: true,
                cellClass: 'd-flex align-items-center text-muted text-crop',
                pipe: lname()
            },
            {
                prop: 'email',
                name: 'Email',
                sortable: false,
                draggable: false,
                canAutoResize: true,
                cellClass: 'd-flex align-items-center text-muted text-crop',
            },
            {
                prop: 'created_on',
                name: 'Last updated',
                sortable: false,
                draggable: false,
                canAutoResize: true,
                cellClass: 'd-flex align-items-center text-muted text-crop',
                pipe: formatDateWithoutTime()
            },
            {
                prop: 'approval',
                name: 'Status',
                sortable: false,
                draggable: false,
                canAutoResize: true,
                cellClass: 'd-flex align-items-center text-muted text-crop',
            },
            {
                prop: '',
                name: 'Actions',
                sortable: false,
                draggable: false,
                canAutoResize: true,
                cellClass: 'd-flex align-items-center text-muted text-crop',
                cellTemplate: cellTemplate.actions,
                width: 40
            },
        ];
    }
    return columns;
}