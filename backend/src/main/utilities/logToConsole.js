export function ltc(callingFunc, prefix, message) {
    if (message === null) {
        return `${callingFunc}: prefix`;
    } else {
        return `${callingFunc} ${prefix}: ${message}`;
    }
}