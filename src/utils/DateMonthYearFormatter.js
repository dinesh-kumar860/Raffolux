export const DateMonthYearFormatter = (timestamp) => {
    const date = new Date(timestamp);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const year = date.getFullYear()
    const month = months[date.getMonth()];
    const formattedDateTime = `${day} ${month} ${year}`;
    return formattedDateTime;
};