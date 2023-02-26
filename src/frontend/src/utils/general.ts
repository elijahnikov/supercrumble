export const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString('en-US', { month: 'short' });
};

export const kFormatter = (num: number) => {
    return Math.abs(num) > 999
        ? Math.sign(num) * ((Math.abs(num) / 1000) as any).toFixed(1) + 'k'
        : Math.sign(num) * Math.abs(num);
};
