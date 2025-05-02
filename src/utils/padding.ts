export function pad(str: string, length: number): string {
    return str + " ".repeat(Math.max(length - str.length, 0));
}
