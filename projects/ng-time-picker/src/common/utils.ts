export function isValidTimeFormat(value) {
    let timeFormatRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/gm
    return timeFormatRegex.test(value);
}

export function getNUntilNumbers(lastNumber: number): number[] {
    return [...Array(lastNumber).keys()];
}

export function getZeroFillNumbers(numbers: number[]): string[] {
    return numbers.map((x) => ('0' + x).slice(-2))
}