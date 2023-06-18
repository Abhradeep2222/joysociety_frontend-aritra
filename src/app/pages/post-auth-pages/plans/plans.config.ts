import { nullable, dollar } from "../../../shared/utilities";

export function columns(cellTemplate: any = {}) {
    let columns: any[] = [];
    columns = [
        {
            prop: 'id',
            name: 'Plan ID',
            sortable: false,
            draggable: false,
            canAutoResize: true,
            cellClass: 'd-flex align-items-center text-muted text-crop',
            pipe: nullable(),
            width: 100
        },
        {
            prop: 'name',
            name: 'Plan Name',
            sortable: false,
            draggable: false,
            canAutoResize: true,
            cellClass: 'd-flex align-items-center text-muted text-crop',
            pipe: nullable()
        },
        {
            prop: 'description',
            name: 'Description',
            sortable: false,
            draggable: false,
            canAutoResize: true,
            cellClass: 'd-flex align-items-center text-muted text-crop',
            width: 200
        },
        {
            prop: 'offer_price',
            name: 'Offer Price',
            sortable: false,
            draggable: false,
            canAutoResize: true,
            cellClass: 'd-flex align-items-center text-muted text-crop',
            pipe: dollar()
        },
        {
            prop: '',
            name: 'Status',
            sortable: false,
            draggable: false,
            canAutoResize: true,
            cellClass: 'd-flex align-items-center text-muted text-crop',
            cellTemplate: cellTemplate.status
        },
        {
            prop: '',
            name: 'Actions',
            sortable: false,
            draggable: false,
            canAutoResize: true,
            cellClass: 'd-flex align-items-center text-muted text-crop',
            cellTemplate: cellTemplate.actions,
            width: 100
        },
    ];
    return columns;
}