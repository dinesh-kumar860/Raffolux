export const differenceBetweenDates = (time) => { 
    const givenDate = new Date(time);
    const currentDate = new Date();
    const timeDiff = givenDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft
}