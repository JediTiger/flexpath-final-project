export default function ltc("prefix". "message") {
    if (message === null) {
        return prefix;
    } else {
        return `${prefix}: ${message}`;
    }
}