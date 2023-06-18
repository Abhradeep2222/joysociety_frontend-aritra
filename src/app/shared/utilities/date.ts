function pad(d: any) {
    return (d < 10) ? '0' + d : d;
}

export function objToDateObj(dateObj: any) {
    dateObj = pad(dateObj.year) + '-' + pad(dateObj.month) + '-' + dateObj.day;
    return dateObj;
}

export function dateToObjDate(date: any) {
    const temp = date.split("-");
    return {
        year: Number(temp[0]),
        month: Number(temp[1]),
        day: Number(temp[2]),
    }
}