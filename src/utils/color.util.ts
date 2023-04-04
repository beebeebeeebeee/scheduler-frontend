import StringUtil from "./string.util";
import {RANDOM_COLORS} from "../constants";

function getColorByName(name?: string): {
    color: string,
    invert: string,
} {
    const hexName: string = parseInt(StringUtil.hexEncode(name != null && name.length > 0 ? name : '0'), 16).toString();
    const color = RANDOM_COLORS[parseInt(hexName.substring(hexName.length - 5))];
    return {color, invert: invertColor(color)};
}

function invertColor(hex: string, bw: boolean = true): string {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    const stringR = (255 - r).toString(16);
    const stringG = (255 - g).toString(16);
    const stringB = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + StringUtil.padZero(stringR) + StringUtil.padZero(stringG) + StringUtil.padZero(stringB);
}

export default {getColorByName, invertColor};