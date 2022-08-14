export const timeDifference = (current: Date, previous: Date) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const currentMs = current.getTime();
    const previousMs = previous.getTime();
    const elapsed = currentMs - previousMs;

    if (elapsed < msPerMinute) {
        if (Math.round(elapsed / 1000) === 1) {
            return Math.round(elapsed / 1000) + ' second ago';
        } else {
            return Math.round(elapsed / 1000) + ' seconds ago';
        }
    } else if (elapsed < msPerHour) {
        if (Math.round(elapsed / msPerMinute) === 1) {
            return Math.round(elapsed / msPerMinute) + ' minute ago';
        } else {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        }
    } else if (elapsed < msPerDay) {
        if (Math.round(elapsed / msPerHour) === 1) {
            return Math.round(elapsed / msPerHour) + ' hour ago';
        } else {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        }
    } else if (elapsed < msPerMonth) {
        if (Math.round(elapsed / msPerDay) === 1) {
            return Math.round(elapsed / msPerDay) + ' day ago';
        } else {
            return Math.round(elapsed / msPerDay) + ' days ago';
        }
    } else if (elapsed < msPerYear) {
        if (Math.round(elapsed / msPerMonth) === 1) {
            return Math.round(elapsed / msPerMonth) + ' month ago';
        } else {
            return Math.round(elapsed / msPerMonth) + ' months ago';
        }
    } else {
        if (Math.round(elapsed / msPerYear) === 1) {
            return Math.round(elapsed / msPerYear) + ' year ago';
        } else {
            return Math.round(elapsed / msPerYear) + ' years ago';
        }
    }
};
