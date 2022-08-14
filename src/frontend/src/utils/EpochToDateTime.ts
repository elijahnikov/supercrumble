//format epoch recieved from meQuery to normal date
export const epochToDateTime = (epoch: string) => {
    const date = new Date(parseInt(epoch));
    const hour = date.getUTCHours()
    const minute = date.getUTCMinutes()
    const seconds = date.getUTCSeconds()
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(
        date
    );
    const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
    return `${day} ${month}, ${year} ${" "} ${hour}:${minute}`;
};
