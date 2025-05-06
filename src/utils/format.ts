export function toPascalCase(fileName: string): string {
    return fileName
        .replace(/[-_]+/g, " ") // Replace - or _ with space
        .replace(/\s+(.)(\w*)/g, (_, first, rest) => first.toUpperCase() + rest.toLowerCase()) // Capitalize first letter of each word
        .replace(/\s/g, "") // Remove spaces
        .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first character
}

export const parsePath = (path: Array<string>) => {
    const filename = path[path.length - 1];
    const dir = path.slice(0, path.length - 1).join("/");
    return { filename, dir };
};

export function toSqlTableName(name: string): string {
    // Replace hyphens with underscores
    let tableName = name.replace(/-/g, "_");

    // Convert to lowercase
    tableName = tableName.toLowerCase();

    // Naive pluralization
    if (tableName.endsWith("y") && !/[aeiou]y$/.test(tableName)) {
        tableName = tableName.slice(0, -1) + "ies";
    } else if (tableName.endsWith("s") || tableName.endsWith("x") || tableName.endsWith("z") || tableName.endsWith("ch") || tableName.endsWith("sh")) {
        tableName += "es";
    } else {
        tableName += "s";
    }

    return tableName;
}
