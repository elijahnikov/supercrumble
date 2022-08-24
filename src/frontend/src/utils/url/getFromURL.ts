export const getFromURL = (text: string) => {
    return text.split('-').slice(-1)[0];
};
