import * as moment from 'moment';
import { TimeFormat } from '../lib/time-picker-options';

const momentNS = moment;

export function isValidTimeFormat(value, isTime24 = true) {
    let time12HourFormatRegex = /(((0[1-9])|(1[0-2])):([0-5])([0-9])\s(A|P|a|p)(M|m))/
    let time24HourFormatRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/gm

    let regexFormat = isTime24 ? time24HourFormatRegex : time12HourFormatRegex
    return regexFormat.test(value);
}

export function getNUntilNumbers(lastNumber: number): number[] {
    return [...Array(lastNumber).keys()];
}

export function getZeroFillNumbers(numbers: number[]): string[] {
    return numbers.map((x) => ('0' + x).slice(-2))
}

export function fillZeroAsPrefixForNumber(value) {
    return ('0' + value).slice(-2)
}

export function showTimeFormat(value: string, format: string = TimeFormat.time24) {
    return momentNS(value, 'h:mm:ss A').format(format);
}

export function addTime(startTime: string, durationAmount: number, timeFormat: string = TimeFormat.time24) {
    var timeValue = momentNS(startTime, 'h:mm:ss A').add(durationAmount, 'hours').format(timeFormat);      
    return timeValue;
}