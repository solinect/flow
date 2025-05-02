export const parserCompare = (a: string, b: string) => {
    return (
        a === b ||
        a
            .split(",")
            .map((n) => n.trim())
            .includes(b)
    );
};
