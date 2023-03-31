import {ONE_DAY_MS} from "../constants";

function hexEncode(str: string) {
    return Array
        .from({length: str.length})
        .map((_, i) =>
            ("000" + str
                .charCodeAt(i)
                .toString(16)).slice(-4))
        .join('');
}

function hexDecode(str: string) {
    let j;
    let hexes = str.match(/.{1,4}/g) || [];
    let back = "";
    for (j = 0; j < hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}

function padZero(str: string, len: number = 2) {
    const zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

function holidayStringToDate(date: string, adjust: boolean = false): Date {
    let _date = new Date(`${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6)}`);
    if(adjust){
        _date = new Date(+_date - ONE_DAY_MS);
    }
    return _date;
}

export default {
    hexEncode,
    hexDecode,
    padZero,
    holidayStringToDate,
};