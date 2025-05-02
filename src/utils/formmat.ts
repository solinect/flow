export function toPascalCase(fileName: string): string {
    return fileName
        .replace(/[-_]+/g, " ") // Replace - or _ with space
        .replace(/\s+(.)(\w*)/g, (_, first, rest) => first.toUpperCase() + rest.toLowerCase()) // Capitalize first letter of each word
        .replace(/\s/g, "") // Remove spaces
        .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first character
}
