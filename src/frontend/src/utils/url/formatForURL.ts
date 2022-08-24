export const formatForURL = (text: string) => {
    return text
        .toLocaleLowerCase()
        .replace(/[^\w\s\']|_/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase();
};
