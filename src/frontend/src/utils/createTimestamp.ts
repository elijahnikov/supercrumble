export const createTimestamp = (date: Date) => {
    const dt = new Date(date);

    const padL = (nr: number, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

    return `${padL(dt.getFullYear())}-${padL(
        dt.getMonth() + 1
    )}-${dt.getDate()} 00:00:00`;
};
